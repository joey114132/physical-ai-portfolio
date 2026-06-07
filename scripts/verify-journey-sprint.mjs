/**
 * Quick verify: journey bootcamp + per-milestone learned + no Shift in hints.
 * Run: node scripts/verify-journey-sprint.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8766/?debug=1";

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--use-gl=swiftshader"],
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForFunction(() => window.__portfolio?.maze, null, { timeout: 15000 });

  const intro = await page.evaluate(() => ({
    hint: document.getElementById("hint")?.textContent ?? "",
    controls: [...document.querySelectorAll("#intro-controls dt")].map((n) =>
      n.textContent?.trim(),
    ),
    sprintHidden: document.getElementById("mobile-sprint")?.hidden === true,
  }));

  if (intro.hint.toLowerCase().includes("shift")) {
    throw new Error(`hint still mentions Shift: ${intro.hint}`);
  }
  if (intro.controls.some((k) => /shift/i.test(k))) {
    throw new Error(`intro controls still mention Shift: ${intro.controls.join(", ")}`);
  }
  if (!intro.sprintHidden) {
    throw new Error("mobile-sprint button is not hidden");
  }

  await page.click("#intro-start");
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const p = window.__portfolio;
    p.unlockAllGates();
    p.maze.teleportToExit();
    p.maze.tryInteract();
  });
  await page.waitForSelector("#journey-overlay:not([hidden])", { timeout: 8000 });
  await page.waitForTimeout(500);

  const journey = await page.evaluate(() => ({
    bootcamp: document.getElementById("journey-bootcamp")?.textContent?.trim() ?? "",
    learnedCount: document.querySelectorAll(".journey-timeline__learned").length,
    milestones: document.querySelectorAll(".journey-timeline__item").length,
  }));

  if (!journey.bootcamp || journey.bootcamp.length < 40) {
    throw new Error(`bootcamp block empty or too short: "${journey.bootcamp.slice(0, 60)}"`);
  }
  if (journey.learnedCount < 4) {
    throw new Error(`expected 4 milestone learned blocks, got ${journey.learnedCount}`);
  }

  const aboutInline = await page.evaluate(() => {
    const about = document.getElementById("journey-about-section");
    const log = document.getElementById("journey-log-section");
    return {
      section: Boolean(about),
      beforeLog: Boolean(
        about && log && about.compareDocumentPosition(log) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
      name: document.getElementById("about-title")?.textContent?.trim() ?? "",
      bio: document.getElementById("about-bio")?.textContent?.trim() ?? "",
    };
  });
  if (!aboutInline.section || !aboutInline.name || aboutInline.bio.length < 20) {
    throw new Error(`about not embedded in journey: ${JSON.stringify(aboutInline)}`);
  }
  if (!aboutInline.beforeLog) {
    throw new Error(`about must appear before journey log: ${JSON.stringify(aboutInline)}`);
  }

  const scroll = await page.evaluate(() => {
    const el = document.getElementById("journey-scroll");
    if (!el) return { ok: false, reason: "missing #journey-scroll" };
    const before = el.scrollTop;
    el.scrollTop = 240;
    const after = el.scrollTop;
    return {
      ok: el.scrollHeight > el.clientHeight + 8 && after > before,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollTop: after,
    };
  });
  if (!scroll.ok) {
    throw new Error(`journey panel not scrollable: ${JSON.stringify(scroll)}`);
  }

  await page.click("#journey-close");
  await page.waitForTimeout(300);
  await page.click("#lang-btn");
  await page.waitForTimeout(300);

  const ko = await page.evaluate(() => ({
    hint: document.getElementById("hint")?.textContent ?? "",
    bootcamp: document.getElementById("journey-bootcamp")?.textContent?.trim() ?? "",
    journeyTitle: document.getElementById("journey-title")?.textContent?.trim() ?? "",
  }));

  await page.evaluate(() => {
    const p = window.__portfolio;
    p.unlockAllGates();
    p.maze.teleportToExit();
    p.maze.tryInteract();
  });
  await page.waitForSelector("#journey-overlay:not([hidden])", { timeout: 8000 });

  const koJourney = await page.evaluate(() => ({
    bootcamp: document.getElementById("journey-bootcamp")?.textContent?.trim() ?? "",
    learnedCount: document.querySelectorAll(".journey-timeline__learned").length,
  }));

  if (ko.hint.toLowerCase().includes("shift") || ko.hint.includes("달리기")) {
    throw new Error(`KO hint still mentions sprint: ${ko.hint}`);
  }
  if (!koJourney.bootcamp || koJourney.bootcamp.length < 30) {
    throw new Error(`KO bootcamp empty: "${koJourney.bootcamp.slice(0, 40)}"`);
  }
  if (koJourney.learnedCount < 4) {
    throw new Error(`KO learned blocks: ${koJourney.learnedCount}`);
  }

  console.log("OK journey+sprint verify:", {
    sprintHidden: intro.sprintHidden,
    bootcampLen: journey.bootcamp.length,
    learnedCount: journey.learnedCount,
    koBootcampLen: koJourney.bootcamp.length,
    koLearnedCount: koJourney.learnedCount,
  });
} finally {
  await browser.close();
}
