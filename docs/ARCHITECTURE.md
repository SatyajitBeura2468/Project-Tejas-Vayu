# Architecture

## Product structure

Project Tejasvayu uses the Next.js App Router. The homepage is a single continuous story; deep routes reuse the same visual language while providing enough room for scientific and construction detail. `/judge` deliberately replaces the normal header with a focused presentation shell.

```text
app/                 Routes, metadata, system states, sitemap and social image
components/
  charts/            Accessible SVG results visualisation
  dashboard/         Recorded-observation replay and controls
  judge/             Seven-chapter presentation experience
  layout/            Global header, footer and deep-page primitives
  motion/            Persistent user motion preference
  sections/          Homepage narrative sections
  three/             WebGL prototype scene and static fallback
  ui/                Small semantic presentation primitives
content/             Typed project facts, navigation, team, results and sources
lib/                 Reconstruction, motion resolution and SEO helpers
styles/              Global, layout, visual, homepage, detail and judge layers
tests/               Unit/integrity tests and Playwright flows
```

## Data flow

The public narrative is intentionally content-driven:

1. `content/results.ts` stores only the supplied qualitative milestones and normalised display values.
2. `lib/results.ts` generates a deterministic smooth interpolation for the replay cursor.
3. `ResultsChart` and `ReplayDashboard` read the same source, preventing chart/dashboard drift.
4. `content/sources.ts` maps each public statistic or scientific statement to a dated record and supported claims.

No client code requests sensor, AQI or real-time pollution data in Version 1.

## Rendering and motion

- The primary prototype illustration uses React Three Fiber only when WebGL is available, motion is allowed and the scene is near the viewport.
- Device pixel ratio is capped to reduce GPU cost.
- An equivalent labelled CSS/SVG chamber diagram is rendered for reduced motion and WebGL failure.
- The user motion choice persists in local storage and overrides the operating-system preference only when explicitly toggled.
- Intersection observation stops the 3D render loop off-screen.

## Accessibility

- Semantic sections and heading order organise the long document.
- A skip link and visible focus treatment support keyboard users.
- Judge mode supports buttons, arrow keys, Page Up/Down, Home/End, Space and horizontal swipe.
- Charts include text labels and an always-available milestone summary.
- Colour is reinforced by labels, line styles and contextual text.
- All touch controls meet a minimum 44 px target.

## Metadata and deployment

Each deep route owns descriptive metadata. Root metadata adds Open Graph/Twitter defaults and CreativeWork JSON-LD; dynamic sitemap and robots routes use `NEXT_PUBLIC_SITE_URL` through `lib/seo.ts`.

For a production deployment:

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin.
2. Run `npm ci`, `npm run build` and the test suite.
3. Deploy the standard Next.js build to a Node-capable host.
4. Verify social cards, source links and all routes on the final origin.
