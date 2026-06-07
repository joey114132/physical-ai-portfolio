/**
 * Headless check: exit arch → cutscene → journey → about → back to maze.
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
    const about = document.getElementById("about-overlay");
    return {
      ok: Boolean(p?.maze),
      mode: p?.mode,
      journeyOpen: journey && !journey.hidden,
      aboutOpen: about && !about.hidden,
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

  await sleep(400);
  let s = await readState(page);
  if (s.cutscene && !s.journeyOpen) {
    await sleep(900);
    s = await readState(page);
  }

  if (!s.journeyOpen || !s.journeyMode) {
    throw new Error(`expected journey overlay after exit E: ${JSON.stringify(s)}`);
  }
  if (!s.journeyTitle) {
    throw new Error(`journey title empty: ${JSON.stringify(s)}`);
  }

  await page.click("#journey-about");
  await sleep(300);
  s = await readState(page);
  if (!s.aboutOpen || s.journeyOpen) {
    throw new Error(`expected about after journey CTA: ${JSON.stringify(s)}`);
  }

  await page.click("#about-close");
  await sleep(300);
  s = await readState(page);
  if (s.mode !== "maze" || s.aboutOpen || s.journeyOpen) {
    throw new Error(`expected maze after about close: ${JSON.stringify(s)}`);
  }

  console.log("OK exit flow:", s.journeyTitle, "→ about → maze");
} finally {
  await browser.close();
}
