# Portfolio 2026

Static portfolio site: a landing page with selected work (Works), three case pages (PME Compass, Posti, SOK) and an About me page (placeholder).

## Structure

| File | Page |
|---|---|
| `index.html` | Works, the landing page |
| `pme.html`, `posti.html`, `sok.html` | Case pages, scroll one fold at a time |
| `about.html` | About me (placeholder) |
| `css/style.css` | All styles |
| `js/main.js` | Navigation pill: next-fold arrow and next-case link |
| `images/` | Images cropped from the slide exports |
| `content pages/` | Source slide exports (not used by the site) |

## How the layout scales

Desktop pages are designed at 1350 x 800 px per fold. Every size in `css/style.css` is `calc(N * var(--u))`, where `--u` is 1/1350 of the viewport width, so layouts scale with the window. Narrow or portrait viewports switch to a 390 px wide mobile base where the image opens each case.

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.
