import type { Work } from '@/types';

/**
 * Finished pieces shown on the Works page, in the order they are numbered.
 *
 * Every piece links to its Instagram reel (`href`) and shows its cover frame (`poster`). A piece
 * with a video file (`src`, an H.264 MP4 in public/films/) plays inside its card; without one, the
 * card's play button opens the reel on Instagram instead. Reels with licensed music cannot be
 * downloaded or embedded, so those need an MP4 exported from the original project.
 * Only list Parasya Pedia's own work, and only name a client who agreed to it.
 */
export const works: Work[] = [
  {
    id: 'rainforest-drive',
    // Working title: the reel's Instagram caption could not be read without logging in.
    title: 'Rainforest drive',
    client: 'Parasya Pedia',
    type: 'Short-form content',
    href: 'https://www.instagram.com/reel/DeqbiQIsY4u/',
    poster: '/films/rainforest-drive.jpg',
    aspect: '16:9',
    date: '2026-10-19',
  },
  {
    id: 'ammu-and-theyyam',
    title: 'Ammu and Theyyam.',
    client: 'Parasya Pedia',
    type: 'Short-form content',
    href: 'https://www.instagram.com/reel/DetA2noRxX0/',
    poster: '/films/ammu-and-theyyam.jpg',
    aspect: '9:16',
    date: '2026-10-20',
  },
  {
    id: 'every-bite',
    title: 'Every bite, a beautiful memory.',
    client: 'Leem Bakery',
    type: 'AI ad',
    href: 'https://www.instagram.com/reel/Det4AsPACVa/',
    src: '/films/every-bite.mp4',
    poster: '/films/every-bite.jpg',
    aspect: '16:9',
    seconds: 29,
    date: '2026-10-20',
  },
  {
    id: 'green-chair',
    // Working title: this reel was posted without a caption.
    title: 'The green chair',
    client: 'Parasya Pedia',
    type: 'Short-form content',
    href: 'https://www.instagram.com/reel/Det0LkkvE03/',
    src: '/films/green-chair.mp4',
    poster: '/films/green-chair.jpg',
    aspect: '9:16',
    seconds: 18,
    date: '2026-10-20',
  },
  {
    id: 'scalp-reviving-shampoo',
    title: 'Scalp Reviving Shampoo.',
    client: 'Moxie Beauty',
    type: 'AI ad',
    href: 'https://www.instagram.com/reel/Ddn1TKtS5er/',
    src: '/films/scalp-reviving-shampoo.mp4',
    poster: '/films/scalp-reviving-shampoo.jpg',
    aspect: '9:16',
    seconds: 10,
    date: '2026-09-23',
  },
  {
    id: 'morning-bliss',
    title: 'Morning bliss.',
    client: 'Parasya Pedia',
    type: 'Short-form content',
    href: 'https://www.instagram.com/reel/DdnjLO4zzJq/',
    poster: '/films/morning-bliss.jpg',
    aspect: '16:9',
    date: '2026-09-23',
  },
];
