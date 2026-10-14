import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Astro copies the original JPG/PNG files next to their optimized WebP versions. Remove the
// originals that no page or stylesheet references, so only the optimized images are deployed.
function dropUnusedOriginals() {
  return {
    name: 'drop-unused-originals',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const astroDir = join(root, '_astro');
        const used = readdirSync(root)
          .filter((f) => f.endsWith('.html'))
          .map((f) => readFileSync(join(root, f), 'utf8'))
          .concat(readdirSync(astroDir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(astroDir, f), 'utf8')))
          .join('\n');
        for (const file of readdirSync(astroDir)) {
          if (/\.(jpe?g|png)$/i.test(file) && !used.includes(file)) rmSync(join(astroDir, file));
        }
      },
    },
  };
}

// Keep the existing URLs (index.html, pme.html, ...) so links and bookmarks keep working.
export default defineConfig({
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [dropUnusedOriginals()],
});
