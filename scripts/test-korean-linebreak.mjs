/**
 * Mobile KO intro: word-break keep-all on lead + return (no syllable splits).
 * Run: node scripts/test-korean-linebreak.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:8766/?debug=1";

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--use-gl=swiftshader"],
});

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.click("#intro-lang-ko");
  await page.waitForTimeout(200);

  const check = await page.evaluate(() => {
    const lead = document.getElementById("intro-lead");
    const ret = document.getElementById("intro-return");
    const lang = document.documentElement.lang;
    const leadWb = lead ? getComputedStyle(lead).wordBreak : "";
    const retWb = ret && !ret.hidden ? getComputedStyle(ret).wordBreak : "n/a";
    const markWb = lead?.querySelector(".key-concept")
      ? getComputedStyle(lead.querySelector(".key-concept")).wordBreak
      : "";
    return { lang, leadWb, retWb, markWb, leadHtml: lead?.innerHTML?.slice(0, 200) ?? "" };
  });

  if (check.lang !== "ko") {
    throw new Error(`expected html lang=ko, got ${check.lang}`);
  }
  if (check.leadWb !== "keep-all") {
    throw new Error(`intro-lead word-break expected keep-all, got ${check.leadWb}`);
  }
  if (check.markWb !== "keep-all") {
    throw new Error(`.key-concept word-break expected keep-all, got ${check.markWb}`);
  }

  console.log("OK Korean line-break (390px):", check);
} finally {
  await browser.close();
}
