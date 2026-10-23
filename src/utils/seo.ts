import { NOT_FOUND, OG_IMAGE, SITE_URL } from '@/data/routes';
import type { RouteMeta } from '@/types';

/** Finds or creates a <meta>/<link> in <head> and sets one attribute on it. */
function setHead(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Keeps the head in step with the page on every client-side navigation: title, description,
 * canonical link, Open Graph and Twitter tags, and noindex on the not-found page.
 * The static HTML written at build time (scripts/seo.mjs) carries the same values for crawlers
 * and link previews that do not run JavaScript.
 */
export function applySeo(route: RouteMeta) {
  const url = route === NOT_FOUND ? SITE_URL : `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  document.title = route.title;

  for (const [key, id, content] of [
    ['name', 'description', route.description],
    ['property', 'og:title', route.title],
    ['property', 'og:description', route.description],
    ['property', 'og:url', url],
    ['property', 'og:image', OG_IMAGE],
    ['name', 'twitter:title', route.title],
    ['name', 'twitter:description', route.description],
    ['name', 'robots', route === NOT_FOUND ? 'noindex, follow' : 'index, follow'],
  ] as const) {
    setHead(
      `meta[${key}="${id}"]`,
      () => {
        const el = document.createElement('meta');
        el.setAttribute(key, id);
        return el;
      },
      'content',
      content,
    );
  }

  setHead(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
    'href',
    url,
  );
}
