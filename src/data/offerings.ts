import type { Offering } from '@/types';
import { box, star } from '@/utils/shapes';

/**
 * The AI-generated services we offer. Each one is drawn with flat brand shapes (see utils/shapes.ts).
 * Edit the copy here when your offering changes.
 */
export const offerings: Offering[] = [
  {
    id: 'product-launch-films',
    title: "AI product launch films",
    tag: 'Brand film',
    duration: '0:20',
    type: 'Brand film',
    description:
      "A hero film for your product, generated with AI: slow-motion detail, warm light and a clean pack close-up that ends on your logo. Ideal for spice, food and D2C ranges.",
    deliverables: ['1 hero film in 16:9', '3 vertical cut-downs in 9:16', 'Pack-shot stills'],
    background: 'midnight',
    shapes: [
      box(20, 12, 60, 60, 'saffron', '50%', 'pu'),
      box(35, 40, 30, 10, 'parchment', '3cqw', 'fl'),
      box(32, 50, 36, 52, 'ember', '7cqw', 'fl'),
      box(38, 64, 24, 18, 'parchment', '2cqw', 'fl'),
      box(22, 104, 5, 5, 'sand', '50%', 'fl', { animationDelay: '-1s' }),
      box(70, 108, 4, 4, 'sand', '50%', 'fl', { animationDelay: '-2s' }),
      box(60, 100, 3.5, 3.5, 'saffron', '50%', 'fl', { animationDelay: '-.5s' }),
      star(74, 10, 12, 'ember', 'sp'),
      star(12, 60, 7, 'saffron', 'sp'),
    ],
  },
  {
    id: 'jewellery-fashion-reveals',
    title: "AI jewellery and fashion ads",
    tag: 'AI ad',
    duration: '0:15',
    type: 'AI ad',
    description:
      "An AI-generated ad that reveals gold, jewellery and fashion slowly: soft light travels across the piece and the camera glides in so every detail is seen.",
    deliverables: ['1 hero ad in 16:9', 'Square and vertical versions', 'Close-up detail stills'],
    background: 'sand',
    shapes: [
      box(26, 36, 48, 48, 'none', '50%', 'pu', { border: '6cqw solid var(--saffron)' }),
      box(43, 22, 14, 14, 'parchment', '2cqw', 'sp'),
      box(18, 100, 64, 20, 'ember', '10cqw 10cqw 0 0'),
      box(30, 96, 40, 4, 'parchment', '2cqw'),
      star(14, 16, 10, 'saffron', 'sp'),
      star(78, 62, 7, 'parchment', 'sp'),
      star(70, 18, 5, 'ember', 'sp'),
    ],
  },
  {
    id: 'cafe-food-reels',
    title: "AI café and food reels",
    tag: 'Short-form',
    duration: '0:08',
    type: 'Short-form content',
    description:
      "Thumb-stopping AI-generated loops for cafés and food brands: the pour, the steam, the first bite, made to be watched on mute.",
    deliverables: ['3 vertical loops in 9:16', 'Captions in Malayalam and English', 'Story-sized cut'],
    background: 'ember',
    shapes: [
      box(66, 8, 24, 24, 'sand', '50%', 'pu'),
      box(38, 28, 5, 20, 'parchment', '3cqw', 'fl', { animationDelay: '-.4s' }),
      box(48, 20, 5, 26, 'parchment', '3cqw', 'fl', { animationDelay: '-1.1s' }),
      box(58, 30, 5, 18, 'parchment', '3cqw', 'fl', { animationDelay: '-1.8s' }),
      box(24, 56, 52, 28, 'parchment', '0 0 26cqw 26cqw'),
      box(70, 60, 14, 14, 'none', '50%', undefined, { border: '3.5cqw solid var(--parchment)' }),
      box(16, 86, 68, 5, 'midnight', '3cqw'),
      star(14, 22, 9, 'midnight', 'sp'),
    ],
  },
  {
    id: 'hospitality-travel-stories',
    title: "AI hospitality and travel films",
    tag: 'Brand film',
    duration: '0:30',
    type: 'Brand film',
    description:
      "An AI-generated brand film for a homestay, resort or tour: first light, the doorway, the host and the place, made for your website and social.",
    deliverables: ['1 story film in 16:9', '2 teaser cuts in 9:16', 'Voiceover in your language'],
    background: 'ember',
    shapes: [
      box(18, 62, 64, 40, 'midnight', '32cqw 32cqw 0 0', 'fl'),
      box(30, 14, 40, 40, 'saffron', '50%', 'pu'),
      box(8, 84, 84, 5, 'sand', '3cqw'),
      star(76, 12, 12, 'parchment', 'sp'),
      star(10, 36, 7, 'sand', 'sp'),
    ],
  },
  {
    id: 'launch-day-reels',
    title: "AI launch day ads",
    tag: 'AI ad',
    duration: '0:12',
    type: 'AI ad',
    description:
      "Fast vertical AI ads for a product drop: bold colour, quick cuts and one clear call to action, made in several hook variations for testing.",
    deliverables: ['5 hook variations in 9:16', 'Cover frames', 'Captions burned in'],
    background: 'parchment',
    shapes: [
      box(18, 18, 64, 64, 'ember', '8cqw', 'fl'),
      box(30, 30, 40, 40, 'parchment', '50%', 'pu'),
      star(44, 44, 12, 'midnight', 'sp'),
      star(78, 10, 10, 'midnight', 'sp'),
      box(8, 88, 84, 4, 'midnight', '2cqw'),
    ],
  },
  {
    id: 'fragrance-beauty-films',
    title: "AI fragrance and beauty ads",
    tag: 'AI ad',
    duration: '0:18',
    type: 'AI ad',
    description:
      "A glossy AI-generated ad for fragrance and beauty: a bottle on a mirrored plinth, a thin mist of light and a slow orbit that ends on the name.",
    deliverables: ['1 hero film in 16:9', 'Square loop for feeds', 'Still frames for the site'],
    background: 'saffron',
    shapes: [
      box(36, 14, 28, 12, 'midnight', '2cqw', 'fl'),
      box(26, 26, 48, 64, 'ember', '8cqw', 'fl'),
      box(34, 44, 32, 22, 'parchment', '2cqw', 'fl'),
      star(76, 8, 12, 'midnight', 'sp'),
      star(10, 56, 8, 'ember', 'sp'),
    ],
  },
];
