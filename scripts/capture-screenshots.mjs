import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const output = new URL("../docs/screenshots/", import.meta.url);

await mkdir(output, { recursive: true });
const browser = await chromium.launch();

async function capture(pathname, filename, viewport, options = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${baseURL}${pathname}`, { waitUntil: "networkidle" });
  if (options.focus) await page.locator(options.focus).scrollIntoViewIfNeeded();
  await page.screenshot({ path: fileURLToPath(new URL(filename, output)), fullPage: options.fullPage ?? false });
  await page.close();
}

await capture("/", "home-desktop.png", { width: 1600, height: 1000 });
await capture("/", "home-mobile.png", { width: 390, height: 844 });
await capture("/dashboard", "dashboard.png", { width: 1440, height: 1000 }, { focus: ".dashboard-route-section" });

await browser.close();
