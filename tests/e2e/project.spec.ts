import { expect, test } from "@playwright/test";

test("homepage presents the project and reaches its core sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "PROJECT TEJASVAYU" })).toBeVisible();
  await expect(page.locator(".hero").getByText("It needs smarter surfaces.", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /Explore the project/i }).click();
  await expect(page.locator("#problem")).toBeInViewport();
  await expect(page.locator(".results-section").getByText("Not raw instrument logs", { exact: true })).toBeVisible();
});

test("hero entrance never blocks the primary interaction", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Explore the project/i }).click();
  await expect(page.locator("#problem")).toBeInViewport();
});

test("hero title mask contains the complete TEJASVAYU word", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(async () => { await document.fonts.ready; });
  await expect(page.locator(".hero-name-word")).toBeVisible();
  await page.waitForTimeout(1400);
  const bounds = await page.evaluate(() => {
    const mask = document.querySelector<HTMLElement>(".hero-word-mask")?.getBoundingClientRect();
    const word = document.querySelector<HTMLElement>(".hero-name-word")?.getBoundingClientRect();
    if (!mask || !word) return null;
    return { maskRight: mask.right, wordRight: word.right };
  });
  expect(bounds).not.toBeNull();
  expect(bounds!.wordRight).toBeLessThanOrEqual(bounds!.maskRight + 0.5);
  expect(await page.locator("canvas").count()).toBeLessThanOrEqual(1);
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

test("enhanced motion stays isolated to the homepage", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-home-page", "true");
  await expect(page.locator(".science-section .section-header")).toHaveClass(/is-animated/);
  await expect(page.locator(".prototype-section .section-header")).toHaveClass(/is-animated/);
  if (!isMobile) await expect(page.locator(".cursor-field")).toHaveClass(/is-home-motion/);

  await page.goto("/science");
  await expect(page.locator("html")).not.toHaveAttribute("data-home-page", "true");
  await expect(page.locator(".science-section .section-header")).not.toHaveClass(/is-animated/);
  if (!isMobile) await expect(page.locator(".cursor-field")).not.toHaveClass(/is-home-motion/);

  await page.goto("/prototype");
  await expect(page.locator(".prototype-section .section-header")).not.toHaveClass(/is-animated/);
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
  await page.goto("/");
  await expect(page.locator(".hero .prototype-scene")).toHaveAttribute("data-rendering", "static");
  const duration = await page.locator(".airflow").first().evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
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

test("mobile menu restores focus when dismissed", async ({ page, isMobile }) => {
  test.skip(!isMobile, "drawer is a mobile interaction");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("route transitions preserve immediate navigation and scientific labels", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop dock exposes the route controls directly");
  await page.goto("/prototype");
  await Promise.all([page.waitForURL(/\/science$/), page.getByLabel("Primary navigation").getByRole("link", { name: "Science", exact: true }).click()]);
  await expect(page.locator('.route-transition-shell[aria-hidden="false"]')).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A surface reaction");
});

test("off-screen WebGL work pauses and status labels remain honest", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop WebGL lifecycle check");
  await page.goto("/");
  const scene = page.locator(".hero .prototype-scene");
  await expect(scene).toHaveAttribute("data-frame-loop", "active");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(scene).toHaveAttribute("data-frame-loop", "paused");
  await page.goto("/dashboard");
  await expect(page.locator(".replay-status")).toHaveText("Observation replay");
  await expect(page.getByText("Visual reconstruction", { exact: true })).toBeVisible();
  await expect(page.locator(".replay-status")).not.toContainText(/live|connected|streaming/i);
});

test("pages do not overflow horizontally", async ({ page }) => {
  for (const route of ["/", "/dashboard", "/judge"]) {
    await page.goto(route);
    await expect(page.locator("#main-content")).toBeVisible();
    const metrics = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .map((element) => ({ element, bounds: element.getBoundingClientRect() }))
        .filter(({ bounds }) => bounds.right > viewportWidth + 1 || bounds.left < -1)
        .slice(0, 8)
        .map(({ element, bounds }) => `${element.tagName.toLowerCase()}.${element.className || "(no-class)"}[${Math.round(bounds.left)},${Math.round(bounds.right)}]`);
      return { overflow: document.documentElement.scrollWidth - viewportWidth, offenders };
    });
    expect(metrics.overflow, `${route} horizontal overflow; offenders: ${metrics.offenders.join(", ")}`).toBeLessThanOrEqual(1);
  }
});
