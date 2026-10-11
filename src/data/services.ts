import type { Service } from '@/types';

export const services: Service[] = [
  {
    title: 'AI brand films',
    summary: 'Cinematic AI-generated films for your brand and products, from launch films to origin stories.',
    details:
      'Cinematic films made with generative AI and directed by our team: launch films, origin stories and place films that show your brand at its best.',
    type: 'Brand film',
    deliverables: ['Launch and hero films', 'Origin and place stories', 'Vertical, square and wide cut-downs'],
  },
  {
    title: 'AI ads',
    summary: 'AI-generated video and image ads for every platform, in as many variations as you want to test.',
    details:
      'Video and image ads generated with AI, made in several variations so you can test hooks, offers and formats and put money behind what works.',
    type: 'AI ad',
    deliverables: ['Video and static ads', 'Five or more variations per concept', 'Sizes for Reels, feeds and web'],
  },
  {
    title: 'AI short-form content',
    summary: 'AI-generated reels and shorts made to be watched on mute and remembered.',
    details:
      'Reels and shorts generated with AI and built to be watched on mute and remembered, made in several hooks so you can test what works.',
    type: 'Short-form content',
    deliverables: [
      'Hook variations in 9:16',
      'Captions in Malayalam, Hindi, Tamil, Arabic or English',
      'Cover frames',
    ],
  },
];
