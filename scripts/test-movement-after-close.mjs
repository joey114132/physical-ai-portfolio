/**
 * Headless check: after closing detail, maze stays unpaused and player can move at portal.
 * Run: node scripts/test-movement-after-close.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8765/?debug=1";
const BRAVE = process.env.BRAVE_PATH ?? "/usr/bin/brave-browser";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function readState(page) {
  return page.evaluate(() => {
    const p = window.__portfolio;
    if (!p?.maze) return { ok: false, reason: "no __portfolio debug hook" };
    const m = p.maze;
    return {
      mode: p.mode,
      paused: m.paused,
      nearZone: m.nearZone,
      x: m.player.position.x,
      z: m.player.position.z,
      cutscene: document.body.classList.contains("cutscene-mode"),
      detail: document.body.classList.contains("detail-mode"),
    };
  });
}

async function holdKey(page, key, ms) {
  await page.keyboard.down(key);
  await sleep(ms);
  await page.keyboard.up(key);
}

const browser = await chromium.launch({
  executablePath: BRAVE,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.click("#intro-start");
  await sleep(800);

  // Teleport to first gate and open detail like timeline shortcut
  await page.evaluate(() => {
    const p = window.__portfolio;
    p.maze.teleportToGate("dl");
    p.openDetail("dl");
  });
  await sleep(500);

  let s = await readState(page);
  if (s.mode !== "detail") throw new Error(`expected detail mode, got ${JSON.stringify(s)}`);

  await page.evaluate(() => window.__portfolio.closeDetail());
  await sleep(200);

  s = await readState(page);
  if (s.mode !== "maze" || s.paused || s.detail || s.cutscene) {
    throw new Error(`after close: bad state ${JSON.stringify(s)}`);
  }
  const x0 = s.x;
  const z0 = s.z;
  await holdKey(page, "w", 2500);
  await sleep(300);

  s = await readState(page);
  const moved = Math.hypot(s.x - x0, s.z - z0) > 0.4;
  if (!moved)
    throw new Error(
      `player did not move after close: ${JSON.stringify({ before: { x0, z0 }, after: s })}`,
    );

  // Wait several seconds at portal edge (repro for old flicker bug)
  await holdKey(page, "s", 800);
  await sleep(4000);
  await holdKey(page, "w", 1200);
  await sleep(200);

  const s2 = await readState(page);
  if (s2.paused) {
    throw new Error(`movement blocked after delay: ${JSON.stringify(s2)}`);
  }

  await page.evaluate(() => {
    const p = window.__portfolio;
    p.maze.teleportToGate("dl");
  });
  await holdKey(page, "w", 1500);
  const atPortal = await readState(page);
  if (atPortal.nearZone !== "dl") {
    throw new Error(`expected near dl portal while on gate: ${JSON.stringify(atPortal)}`);
  }
  await holdKey(page, "d", 1200);
  const afterPortal = await readState(page);
  const portalMoved = Math.hypot(afterPortal.x - atPortal.x, afterPortal.z - atPortal.z) > 0.35;
  if (!portalMoved) {
    throw new Error(
      `should move through portal zone: ${JSON.stringify({ atPortal, afterPortal })}`,
    );
  }

  console.log("PASS: movement works immediately and after 4s dwell at portal");
} finally {
  await browser.close();
}
