/**
 * Headless check: exit arch → cutscene → combined journey+about → back to maze.
 * Run: node scripts/test-exit-flow.mjs
 * Needs: server on PORTFOLIO_URL (default http://127.0.0.1:8766/?debug=1)
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8766/?debug=1";
const USE_BRAVE = process.env.USE_BRAVE === "1";
const BRAVE = process.env.BRAVE_PATH ?? "/usr/bin/brave-browser";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function readState(page) {
  return page.evaluate(() => {
    const p = window.__portfolio;
    const journey = document.getElementById("journey-overlay");
    return {
      ok: Boolean(p?.maze),
      mode: p?.mode,
      journeyOpen: journey && !journey.hidden,
      aboutInJourney: Boolean(document.getElementById("journey-about-section")),
      aboutBeforeLog: (() => {
        const about = document.getElementById("journey-about-section");
        const log = document.getElementById("journey-log-section");
        return Boolean(
          about && log && about.compareDocumentPosition(log) & Node.DOCUMENT_POSITION_FOLLOWING,
        );
      })(),
      aboutTitle: document.getElementById("about-title")?.textContent?.trim() ?? "",
      journeyTitle: document.getElementById("journey-title")?.textContent?.trim() ?? "",
      cutscene: document.body.classList.contains("cutscene-mode"),
      journeyMode: document.body.classList.contains("journey-mode"),
    };
  });
}

const browser = await chromium.launch(
  USE_BRAVE
    ? {
        executablePath: BRAVE,
        headless: true,
        args: ["--no-sandbox", "--disable-gpu", "--use-gl=angle"],
      }
    : {
        headless: true,
        args: ["--no-sandbox", "--use-gl=swiftshader"],
      },
);

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  const bootErr = await page.$("#boot-error");
  if (bootErr) {
    const msg = await bootErr.textContent();
    throw new Error(`3D init failed in browser (WebGL?): ${msg?.trim()}`);
  }
  await page.waitForFunction(() => window.__portfolio?.maze, null, { timeout: 15000 });
  await page.click("#intro-start");
  await sleep(600);

  await page.evaluate(() => {
    const p = window.__portfolio;
    p.unlockAllGates();
    p.maze.teleportToExit();
    p.maze.tryInteract();
  });

  await page.waitForSelector("#journey-overlay:not([hidden])", { timeout: 12000 });
  await page.waitForFunction(() => document.body.classList.contains("journey-mode"), null, {
    timeout: 5000,
  });
  let s = await readState(page);

  if (!s.journeyOpen || !s.journeyMode) {
    throw new Error(`expected journey overlay after exit E: ${JSON.stringify(s)}`);
  }
  if (!s.journeyTitle) {
    throw new Error(`journey title empty: ${JSON.stringify(s)}`);
  }
  if (!s.aboutInJourney || !s.aboutTitle) {
    throw new Error(`expected about section inside journey: ${JSON.stringify(s)}`);
  }
  if (!s.aboutBeforeLog) {
    throw new Error(`expected about section before journey log: ${JSON.stringify(s)}`);
  }

  await page.click("#journey-close");
  await sleep(300);
  s = await readState(page);
  if (s.mode !== "maze" || s.journeyOpen) {
    throw new Error(`expected maze after journey close: ${JSON.stringify(s)}`);
  }

  console.log("OK exit flow: about first,", s.aboutTitle, "→", s.journeyTitle, "→ maze");
} finally {
  await browser.close();
}
