# Portfolio 2026

Portfolio site built with [Astro](https://astro.build): a landing page with selected work (Works), three case pages (PME Compass, Posti, SOK) and an About me page. It builds to plain static files, so it needs no server.

## Develop

Requires Node 22.12 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the site to dist/
npm run preview  # serve dist/ locally
```

## Structure

| Path | What |
|---|---|
| `src/pages/` | `index` (Works, the landing page), `pme`, `posti`, `sok` (case pages, scroll one fold at a time) and `about` |
| `src/layouts/Layout.astro` | `<head>`, fonts, global styles, the navigation pill and the script |
| `src/components/` | `Pill`, `Hero`, `Split` (image + text fold), `Hd` (fold header), `Timeline`, `Img` and the hidden `SubstitutionCase` |
| `src/data/timeline.json` | The PME project timeline |
| `src/styles/global.css` | All styles |
| `src/scripts/main.js` | Navigation pill: scroll progress, next-fold arrow, next-case link and arrow-key navigation |
| `src/assets/` | Images, cropped from the slide exports. They are optimized to WebP with several widths at build time |
| `public/` | Files served as they are (favicon) |
| `content pages/` | Source slide exports (not used by the site) |
| `netlify.toml` | Netlify build: `npm run build`, publish `dist`, Node 22 |

Pages are built as `index.html`, `pme.html`, ... (`build.format: 'file'`), so the URLs are the same as before the move to Astro.

## How the layout scales

Desktop pages are designed at 1350 x 800 px per fold. Every size in `src/styles/global.css` is `calc(N * var(--u))`, where `--u` is 1/1350 of the viewport width, so layouts scale with the window. Viewports narrower than 1180 px (or portrait) switch to a stacked layout on a 390 px wide base, capped at 1.2x, where the image opens each case.

## Showing the hidden mini-case

The S-kaupat "Better substitutions" mini-case is built but hidden. To show it, set `showSubstitutionCase` to `true` in `src/pages/sok.astro`.
