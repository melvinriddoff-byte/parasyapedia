import type { CSSProperties } from 'react';
import type { BoxShape, BrandColor, StarShape } from '@/types';

/**
 * Helpers for describing flat-colour artwork.
 * All numbers are in `cqw` units, so artwork scales with its container.
 */
export const box = (
  x: number,
  y: number,
  w: number,
  h: number,
  color: BrandColor | 'none',
  radius?: string,
  className?: string,
  style?: CSSProperties,
): BoxShape => ({ kind: 'box', x, y, w, h, color, radius, className, style });

export const star = (
  x: number,
  y: number,
  size: number,
  color: BrandColor,
  className?: string,
): StarShape => ({ kind: 'star', x, y, size, color, className });
