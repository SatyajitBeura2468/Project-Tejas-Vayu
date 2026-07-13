import { expect, test } from "@playwright/test";

test("homepage presents the project and reaches its core sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "PROJECT TEJASVAYU" })).toBeVisible();
  await expect(page.locator(".hero").getByText("It needs smarter surfaces.", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /Explore the project/i }).click();
  await expect(page.locator("#problem")).toBeInViewport();
  await expect(page.locator(".results-section").getByText("Not raw instrument logs", { exact: true })).toBeVisible();
});

test("all required routes load without an error surface", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["/prototype", "/science", "/methodology", "/results", "/dashboard", "/team", "/future", "/sources", "/judge"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), route).toBeTruthy();
    await expect(page.locator("body")).not.toContainText("Something interrupted the experiment");
    await expect(page.locator("#main-content")).toBeVisible();
  }
});

test("floating mode dock appears after the homepage hero", async ({ page, isMobile }) => {
  test.skip(isMobile, "mobile navigation uses a drawer");
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  const header = page.locator(".site-header");
  await expect(header).toHaveClass(/is-docked/);
  await expect(header.getByRole("link", { name: "Science" })).toBeVisible();
  await expect(header.getByRole("link", { name: "Judge" })).toBeVisible();
  await expect(header.getByRole("link", { name: "Replay" })).toBeVisible();
});

test("judge mode supports keyboard and touch-sized chapter controls", async ({ page, isMobile }) => {
  test.setTimeout(60_000);
  await page.goto("/judge");
  await expect(page.locator(".judge-experience")).toHaveAttribute("data-judge-ready", "true");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pollution is distributed");
  if (isMobile) await page.getByRole("button", { name: "Next", exact: true }).click();
  else await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Use the surfaces already present");
  if (isMobile) {
    const next = page.getByRole("button", { name: "Next", exact: true });
    for (let step = 0; step < 5; step += 1) await next.click();
  } else {
    await expect(page.locator(".judge-experience")).toHaveAttribute("data-judge-ready", "true");
    await page.keyboard.press("End");
  }
  await expect(page.getByRole("heading", { level: 1 })).toContainText("The city does not need more spaces");
  await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
});

test("recorded dashboard controls change state without implying live data", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByText(/not a live hardware dashboard/i)).toBeVisible();
  await page.getByLabel("Jump to milestone").selectOption("120");
  await expect(page.locator(".replay-time strong")).toHaveText("02:00");
  await page.getByRole("button", { name: "Restart" }).click();
  await expect(page.locator(".replay-time strong")).toHaveText("00:00");
  await page.getByRole("button", { name: /^Play$/ }).click();
  await expect(page.getByRole("button", { name: /^Pause$/ })).toBeVisible();
});

test("reduced-motion visitors receive manual replay controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/dashboard");
  await expect(page.getByText(/Reduced motion is active/i)).toBeVisible();
  await page.getByLabel("Jump to milestone").selectOption("240");
  await expect(page.locator(".replay-time strong")).toHaveText("04:00");
});

test("mobile menu provides working route navigation", async ({ page, isMobile }) => {
  test.setTimeout(60_000);
  test.skip(!isMobile, "drawer is a mobile interaction");
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-reduced-motion", /true|false/);
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  const scienceLink = menu.getByRole("link", { name: "Science", exact: true });
  await expect(scienceLink).toHaveAttribute("href", "/science");
  await Promise.all([page.waitForURL(/\/science$/), scienceLink.click()]);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A surface reaction");
});

test("pages do not overflow horizontally", async ({ page }) => {
  for (const route of ["/", "/dashboard", "/judge"]) {
    await page.goto(route);
    await expect(page.locator("#main-content")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(1);
  }
});
