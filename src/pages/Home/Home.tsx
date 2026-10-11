import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { ClientsStrip } from './sections/ClientsStrip/ClientsStrip';
import { FeaturedServices } from './sections/FeaturedServices/FeaturedServices';
import { Hero } from './sections/Hero/Hero';
import { Intro } from './sections/Intro/Intro';
import { TestimonialPreview } from './sections/TestimonialPreview/TestimonialPreview';
import { Ticker } from './sections/Ticker/Ticker';

export function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Intro />
      <FeaturedServices />
      <ClientsStrip />
      <TestimonialPreview />
      <CtaBand lines={['Need an AI ad', 'for your brand?']} />
    </>
  );
}
