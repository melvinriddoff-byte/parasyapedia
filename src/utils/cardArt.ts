import { STAR_PATH } from '@/components/ui/Icons/Icons';
import type { BoxShape, Offering } from '@/types';

/**
 * Turns an offering's flat artwork (the shape lists in data/offerings.ts) into a still SVG image,
 * so it can be used as a texture by the WebGL carousel. Shape units are cqw of a 100-wide card,
 * and the card art is 4:5, so the drawing space is 100 x 125.
 */

const HEX: Record<string, string> = {
  ember: '#FF5826',
  saffron: '#FFB224',
  midnight: '#0F0F0E',
  sand: '#D9D2C5',
  parchment: '#F6F2EA',
};

const num = (value: string): number => (value.endsWith('cqw') ? parseFloat(value) : 0);

/** A rectangle with per-corner radii, as an SVG path. */
function roundedRect(x: number, y: number, w: number, h: number, radii: number[]): string {
  const max = Math.min(w, h) / 2;
  const [tl, tr, br, bl] = radii.map((r) => Math.min(r, max));
  return (
    `M${x + tl} ${y}H${x + w - tr}A${tr} ${tr} 0 0 1 ${x + w} ${y + tr}V${y + h - br}` +
    `A${br} ${br} 0 0 1 ${x + w - br} ${y + h}H${x + bl}A${bl} ${bl} 0 0 1 ${x} ${y + h - bl}` +
    `V${y + tl}A${tl} ${tl} 0 0 1 ${x + tl} ${y}Z`
  );
}

function boxSvg(shape: BoxShape): string {
  const { x, y, w, h } = shape;
  const radius = (shape.radius ?? '0').trim();

  // ring: a transparent circle drawn with a thick border (border sits outside the box)
  const border = typeof shape.style?.border === 'string' ? shape.style.border.match(/([\d.]+)cqw solid var\(--(\w+)\)/) : null;
  if (border) {
    const bw = parseFloat(border[1]);
    const outer = w + bw * 2;
    return `<circle cx="${x + outer / 2}" cy="${y + outer / 2}" r="${(outer - bw) / 2}" fill="none" stroke="${HEX[border[2]]}" stroke-width="${bw}"/>`;
  }
  if (shape.color === 'none') return '';
  const fill = HEX[shape.color];

  if (radius === '50%') return `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${fill}"/>`;
  const radii = radius.split(/\s+/).map(num);
  if (radii.length === 1) radii.push(radii[0], radii[0], radii[0]);
  if (radii.every((r) => r === 0)) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  return `<path d="${roundedRect(x, y, w, h, radii)}" fill="${fill}"/>`;
}

/** A data URL for the offering's card image. */
export function offeringCardImage(offering: Offering): string {
  const body = offering.shapes
    .map((shape) =>
      shape.kind === 'star'
        ? `<path transform="translate(${shape.x} ${shape.y}) scale(${shape.size / 40})" d="${STAR_PATH}" fill="${HEX[shape.color]}"/>`
        : boxSvg(shape),
    )
    .join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 100 125">` +
    `<rect width="100" height="125" fill="${HEX[offering.background]}"/>${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
