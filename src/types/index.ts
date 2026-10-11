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
