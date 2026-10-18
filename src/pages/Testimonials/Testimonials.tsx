import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider/TestimonialSlider';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { comingSoonSlides } from '@/data/testimonials';
import './Testimonials.css';

/**
 * The slider shows "Coming soon" cards until real quotes are ready. The filter and
 * TestimonialBook components (and the sample quotes in src/data/testimonials.ts) are kept
 * for when the cards section is switched back on.
 */
export function Testimonials() {
  return (
    <>
      <PageHeader
        title={['Kind words.']}
        lede="What brands say about their AI-generated films and ads."
        deco="testimonials"
        className="testimonials-header"
      />

      <section className="testimonials-slider s-light">
        <div className="wrap">
          <TestimonialSlider items={comingSoonSlides} />
        </div>
      </section>

      <CtaBand lines={['Be our next', 'happy client.']} />
    </>
  );
}
