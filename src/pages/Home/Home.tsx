import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { ClientsStrip } from './sections/ClientsStrip';
import { FeaturedServices } from './sections/FeaturedServices';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { TestimonialPreview } from './sections/TestimonialPreview';
import { Ticker } from './sections/Ticker';
import './Home.css';

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
