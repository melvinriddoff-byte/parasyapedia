// Runs after `vite build`. Reads src/data/seo.json and, in dist/:
//   - writes one HTML file per page (about.html, services.html, ...) carrying that page's title,
//     description, canonical link and share tags, so crawlers and link previews that do not run
//     JavaScript still see the right values (the app itself is unchanged; it boots the same way);
//   - writes 404.html with noindex;
//   - writes sitemap.xml and robots.txt.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const seo = JSON.parse(readFileSync(resolve(root, 'src/data/seo.json'), 'utf8'));
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const urlFor = (path) => `${seo.siteUrl}${path === '/' ? '/' : path}`;

function render(page, { url, robots }) {
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`],
    [/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${esc(page.description)}"`],
    [/(<meta name="robots" content=")[^"]*"/, `$1${robots}"`],
    [/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`],
    [/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`],
    [/(<meta property="og:title" content=")[^"]*"/, `$1${esc(page.title)}"`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${esc(page.description)}"`],
    [/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(page.title)}"`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${esc(page.description)}"`],
  ];
  return swaps.reduce((html, [pattern, value]) => {
    if (!pattern.test(html)) throw new Error(`seo.mjs: no match for ${pattern} in dist/index.html`);
    return html.replace(pattern, value);
  }, template);
}

for (const page of seo.pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  writeFileSync(resolve(dist, file), render(page, { url: urlFor(page.path), robots: 'index, follow' }));
}
writeFileSync(resolve(dist, '404.html'), render(seo.notFound, { url: seo.siteUrl + '/', robots: 'noindex, follow' }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seo.pages.map((page) => `  <url><loc>${urlFor(page.path)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`);

console.log(`seo: wrote ${seo.pages.length} pages, 404.html, sitemap.xml and robots.txt`);
