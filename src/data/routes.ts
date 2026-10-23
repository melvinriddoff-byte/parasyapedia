import type { RouteMeta } from '@/types';

export const ROUTES: RouteMeta[] = [
  { path: '/', label: 'Home', title: 'Parasya Pedia | AI-Generated Brand Films and Ads' },
  { path: '/about', label: 'About us', title: 'About us | Parasya Pedia' },
  { path: '/services', label: 'Services', title: 'Services | Parasya Pedia' },
  { path: '/works', label: 'Works', title: 'Works | Parasya Pedia' },
  { path: '/testimonials', label: 'Testimonials', title: 'Testimonials | Parasya Pedia' },
  { path: '/contact', label: 'Contact', title: 'Contact | Parasya Pedia' },
];

export const NOT_FOUND: RouteMeta = {
  path: '*',
  label: 'Page not found',
  title: 'Page not found | Parasya Pedia',
};

/** Finds the route metadata for a pathname (ignores trailing slashes). */
export function findRoute(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ROUTES.find((route) => route.path === clean) ?? NOT_FOUND;
}
