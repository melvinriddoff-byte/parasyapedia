import type { CSSProperties } from 'react';

/** Names of the brand colours defined in styles/tokens.css. */
export type BrandColor =
  | 'ember'
  | 'saffron'
  | 'midnight'
  | 'sand'
  | 'parchment';

/** The three kinds of work the studio makes. Used for filters and the contact form. */
export type WorkType = 'Brand film' | 'AI ad' | 'Short-form content';

/** A flat-colour rectangle/circle. Units are `cqw` (1% of the container width). */
export interface BoxShape {
  kind: 'box';
  x: number;
  y: number;
  w: number;
  h: number;
  color: BrandColor | 'none';
  radius?: string;
  className?: string;
  style?: CSSProperties;
}

/** The brand's four-point star. Units are `cqw`. */
export interface StarShape {
  kind: 'star';
  x: number;
  y: number;
  size: number;
  color: BrandColor;
  className?: string;
}

export type Shape = BoxShape | StarShape;

/**
 * One finished piece on the Works page. Images and videos live in public/works/.
 * Give it `src` to play the film on the page, `href` to open it on Instagram, or both.
 */
export interface Work {
  /** Short slug, also used as the URL hash (/works#beyond-the-frame). */
  id: string;
  title: string;
  /** The brand it was made for. Only name clients who agreed to be named. */
  client: string;
  type: WorkType;
  /** Video under public/, e.g. "/works/beyond-the-frame.mp4". */
  src?: string;
  /** The post on Instagram; clicking the film opens it in a new tab. */
  href?: string;
  /** Still shown before the video plays, e.g. "/works/beyond-the-frame.jpg". */
  poster: string;
  aspect: '16:9' | '9:16' | '1:1' | '4:5';
  /** Running time in seconds, when known. */
  seconds?: number;
  /** When it was published, as YYYY-MM-DD. */
  date: string;
}

export interface Offering {
  id: string;
  title: string;
  tag: string;
  duration: string;
  type: WorkType;
  background: BrandColor;
  description: string;
  deliverables: string[];
  shapes: Shape[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** The client's brand. */
  brand: string;
  /** Town or district, e.g. "Thrissur, Kerala". */
  place: string;
  category: WorkType;
}

export interface Principle {
  title: string;
  text: string;
  icon: Shape[];
}

export interface Service {
  title: string;
  summary: string;
  details: string;
  type: WorkType;
  deliverables: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RouteMeta {
  path: string;
  label: string;
  title: string;
}

export type DecoKey = 'about' | 'services' | 'testimonials' | 'contact';

/** Data passed through router state to pre-fill the contact form. */
export interface BriefPrefill {
  type?: WorkType | 'Not sure yet';
  message?: string;
}
