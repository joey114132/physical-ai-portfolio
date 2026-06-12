/**
 * Desktop 2-column layout smoke — detail view + deck grid-2 slides.
 * Run: node scripts/with-local-serve.mjs -- node scripts/test-desktop-columns.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8766/";
const ROOT = BASE.replace(/\/?$/, "/");
const VIEWPORTS = [
  { width: 1920, height: 1080, label: "1920x1080" },
  { width: 1280, height: 800, label: "1280x800" },
];

function columnCount(gridTemplateColumns) {
  return gridTemplateColumns.split(/\s+/).filter((p) => p && p !== "none").length;
}

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--use-gl=swiftshader"],
});

try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: vp });

    await page.goto(`${ROOT}?debug=1`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForFunction(() => typeof window.__portfolio?.openDetail === "function", null, {
      timeout: 20000,
    });
    await page.evaluate(async () => {
      await window.__portfolio.openDetail("dl");
    });
    await page.waitForSelector("body.detail-mode .detail-body", { timeout: 15000 });

    const detailGtc = await page.$eval(".detail-body", (el) => getComputedStyle(el).gridTemplateColumns);
    const detailCols = columnCount(detailGtc);
    if (detailCols < 2) {
      throw new Error(`${vp.label} detail-body: expected 2 columns, got "${detailGtc}"`);
    }

    await page.goto(`${ROOT}presentation/portfolio-deck.html`, {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    await page.waitForSelector("body.deck-ready", { timeout: 60000 });

    const deckGtc = await page.$eval(".slide-body.grid-2", (el) => getComputedStyle(el).gridTemplateColumns);
    const deckCols = columnCount(deckGtc);
    if (deckCols < 2) {
      throw new Error(`${vp.label} deck slide-body.grid-2: expected 2 columns, got "${deckGtc}"`);
    }

    console.log(`OK ${vp.label}: detail=${detailGtc} deck=${deckGtc}`);
    await page.close();
  }
} finally {
  await browser.close();
}
