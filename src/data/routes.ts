import type { RouteMeta } from '@/types';
import seo from './seo.json';

/**
 * Pages, in navigation order, with the title and description search engines and link previews show.
 * Edit them in seo.json: scripts/seo.mjs reads the same file at build time to write each page's
 * static HTML, the sitemap and robots.txt.
 */
export const ROUTES: RouteMeta[] = seo.pages;

export const NOT_FOUND: RouteMeta = seo.notFound;

export const SITE_URL = seo.siteUrl;
export const OG_IMAGE = `${seo.siteUrl}${seo.ogImage}`;

/** Finds the route metadata for a pathname (ignores trailing slashes). */
export function findRoute(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ROUTES.find((route) => route.path === clean) ?? NOT_FOUND;
}
