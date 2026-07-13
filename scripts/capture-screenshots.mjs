import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const output = new URL("../docs/screenshots/", import.meta.url);

await mkdir(output, { recursive: true });
const browser = await chromium.launch();

async function capture(pathname, filename, viewport, options = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.addInitScript((preference) => window.localStorage.setItem("tejasvayu-motion-preference", preference), options.reduced ? "reduced" : "full");
  await page.emulateMedia({ reducedMotion: options.reduced ? "reduce" : "no-preference" });
  await page.goto(`${baseURL}${pathname}`, { waitUntil: "networkidle" });
  if (options.reduced) await page.waitForFunction(() => document.documentElement.dataset.reducedMotion === "true");
  if (options.wait && !options.focus && !options.scrollWithin) await page.waitForTimeout(options.wait);
  if (options.focus) {
    await page.locator(options.focus).scrollIntoViewIfNeeded();
    await page.waitForTimeout(options.wait ?? 320);
  }
  if (options.scrollWithin) {
    await page.evaluate(({ selector, amount }) => {
      const element = document.querySelector(selector);
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + amount, behavior: "instant" });
    }, options.scrollWithin);
    await page.waitForTimeout(options.wait ?? 320);
  }
  if (options.openMenu) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.waitForTimeout(220);
  }
  if (options.fullPage) {
    await page.evaluate(async () => {
      document.body.style.zoom = "0.72";
      await new Promise((resolve) => window.setTimeout(resolve, 80));
      const step = Math.max(480, Math.floor(window.innerHeight * 0.8));
      for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
        window.scrollTo({ top, behavior: "instant" });
        await new Promise((resolve) => window.setTimeout(resolve, 35));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    });
  }
  await page.screenshot({ path: fileURLToPath(new URL(filename, output)), fullPage: options.fullPage ?? false });
  await page.close();
}

const desktop = { width: 1600, height: 1000 };
const mobile = { width: 390, height: 844 };

await capture("/", "home-desktop.png", desktop, { wait: 1900 });
await capture("/", "home-mobile.png", mobile, { wait: 1600 });
await capture("/", "motion-home-overview.png", desktop, { fullPage: true, reduced: true });
await capture("/", "motion-hero-scroll.png", desktop, { scrollWithin: { selector: ".hero", amount: 650 } });
await capture("/", "motion-problem.png", desktop, { focus: "#problem" });
await capture("/", "motion-prototype.png", desktop, { scrollWithin: { selector: "#prototype", amount: 850 }, wait: 900 });
await capture("/", "motion-science.png", desktop, { scrollWithin: { selector: "#science", amount: 600 } });
await capture("/", "motion-results.png", desktop, { scrollWithin: { selector: "#results", amount: 540 }, wait: 900 });
await capture("/", "motion-future.png", desktop, { scrollWithin: { selector: "#future", amount: 1600 }, wait: 600 });
await capture("/", "motion-closing.png", desktop, { scrollWithin: { selector: ".closing-section", amount: 580 }, wait: 600 });
await capture("/judge", "motion-judge.png", desktop, { wait: 500 });
await capture("/", "motion-mobile-prototype.png", mobile, { focus: "#prototype", wait: 800 });
await capture("/", "motion-mobile-navigation.png", mobile, { openMenu: true });
await capture("/", "motion-reduced.png", desktop, { reduced: true, focus: "#science" });
await capture("/dashboard", "dashboard.png", { width: 1440, height: 1000 }, { focus: ".dashboard-route-section" });

await browser.close();
