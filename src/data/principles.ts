import type { Principle } from '@/types';
import { box, star } from '@/utils/shapes';

export const principles: Principle[] = [
  {
    title: 'Human direction',
    text: 'AI generates every shot and ad. A person decides what is right for your product and your story.',
    icon: [box(10, 10, 44, 44, 'saffron', '50%', 'pu'), box(22, 30, 20, 30, 'ember', '10cqw 10cqw 0 0')],
  },
  {
    title: 'True to the product',
    text: 'Packs, colours and logos are checked against the real thing before any AI-generated ad goes live.',
    icon: [
      box(20, 4, 24, 8, 'parchment', '2cqw'),
      box(16, 12, 32, 46, 'saffron', '6cqw', 'fl'),
      box(22, 28, 20, 14, 'midnight', '2cqw', 'fl'),
    ],
  },
  {
    title: 'You approve every stage',
    text: 'The brief, the frames and the final cut all wait for your yes.',
    icon: [star(6, 6, 52, 'saffron', 'sp')],
  },
  {
    title: 'Rooted in Kerala, open to every language',
    text: 'Captions and voiceovers in Malayalam, Hindi, Tamil, Arabic and English.',
    icon: [box(6, 10, 52, 52, 'sand', '50%', 'pu'), star(20, 20, 24, 'parchment', 'sp')],
  },
];
