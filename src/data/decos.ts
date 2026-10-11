import type { DecoKey, Shape } from '@/types';
import { box, star } from '@/utils/shapes';

const tri = { clipPath: 'polygon(0 0, 100% 50%, 0 100%)' };

/** Decorative artwork shown at the right of each page header. */
export const decos: Record<DecoKey, Shape[]> = {
  about: [
    box(14, 8, 56, 56, 'saffron', '50%', 'pu'),
    box(26, 48, 64, 52, 'ember', '32cqw 32cqw 0 0', 'fl'),
    box(8, 58, 62, 12, 'sand', '50cqw', 'fl', { animationDelay: '-1.2s' }),
    star(74, 6, 18, 'midnight', 'sp'),
    box(4, 28, 9, 9, 'midnight', '50%', 'fl', { animationDelay: '-2s' }),
  ],
  services: [
    box(8, 24, 32, 56, 'ember', '7cqw', 'fl'),
    box(34, 10, 32, 56, 'saffron', '7cqw', 'fl', { animationDelay: '-1s' }),
    box(60, 28, 32, 56, 'sand', '7cqw', 'fl', { animationDelay: '-2s' }),
    box(21, 48, 8, 10, 'midnight', '0', undefined, tri),
    box(47, 34, 8, 10, 'midnight', '0', undefined, tri),
    box(73, 52, 8, 10, 'midnight', '0', undefined, tri),
    star(76, 4, 14, 'midnight', 'sp'),
    box(10, 90, 80, 4, 'sand', '4cqw'),
  ],
  testimonials: [
    box(10, 10, 80, 80, 'ember', '50%', 'pu'),
    star(74, 2, 16, 'saffron', 'sp'),
    star(4, 72, 10, 'midnight', 'sp'),
  ],
  contact: [
    box(12, 16, 76, 76, 'saffron', '50%', 'pu'),
    box(22, 36, 56, 40, 'parchment', '5cqw', 'fl'),
    box(22, 36, 56, 22, 'ember', '0', 'fl', { clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }),
    star(74, 4, 16, 'ember', 'sp'),
    box(6, 80, 14, 14, 'sand', '50%', 'fl'),
  ],
};
