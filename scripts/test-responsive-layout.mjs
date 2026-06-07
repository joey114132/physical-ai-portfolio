/**
 * Desktop maze: quest mission banner horizontally centered in top bar.
 * Run: node scripts/test-responsive-layout.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8766/?debug=1";

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--use-gl=swiftshader"],
});

try {
  for (const viewport of [
    { width: 1280, height: 800, label: "desktop" },
    { width: 390, height: 844, label: "mobile" },
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForFunction(() => window.__portfolio?.maze, null, { timeout: 15000 });
    await page.click("#intro-start");
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      const q = document.getElementById("quest-banner");
      if (!q) return;
      q.classList.add("quest-banner--active");
      q.innerHTML = "01→04 스테이션을 순서대로 방문해 주세요";
    });

    const metrics = await page.evaluate(() => {
      const bar = document.querySelector("body.maze-mode .top-bar");
      const quest = document.getElementById("quest-banner");
      if (!bar || !quest) return { ok: false, reason: "missing top-bar or quest-banner" };
      const br = bar.getBoundingClientRect();
      const qr = quest.getBoundingClientRect();
      const questCenter = qr.left + qr.width / 2;
      const barCenter = br.left + br.width / 2;
      const delta = Math.abs(questCenter - barCenter);
      const wb = getComputedStyle(quest).wordBreak;
      const ta = getComputedStyle(quest).textAlign;
      return {
        ok: true,
        delta,
        barWidth: br.width,
        questWidth: qr.width,
        textAlign: ta,
        wordBreak: wb,
      };
    });

    if (!metrics.ok) throw new Error(`${viewport.label}: ${metrics.reason}`);

    if (viewport.label === "desktop") {
      if (metrics.delta > 24) {
        throw new Error(
          `${viewport.label}: quest-banner off-center by ${metrics.delta.toFixed(1)}px`,
        );
      }
      if (metrics.textAlign !== "center") {
        throw new Error(`${viewport.label}: quest text-align expected center`);
      }
      if (metrics.questWidth >= metrics.barWidth - 8) {
        throw new Error(`${viewport.label}: quest-banner should not span full bar width`);
      }
    }

    console.log(`OK layout ${viewport.label}:`, metrics);
    await page.close();
  }
} finally {
  await browser.close();
}
