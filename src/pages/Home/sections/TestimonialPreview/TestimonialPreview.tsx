import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider/TestimonialSlider';
import { comingSoonSlides } from '@/data/testimonials';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';

/** Testimonial slider. Shows "Coming soon" cards until real quotes are ready. */
export function TestimonialPreview() {
  return (
    <section className="sec s-soft">
      <div className="wrap">
        <div className="head-row">
          <TitleReveal lines={['What clients', 'say.']} className="h2" />
        </div>
        <TestimonialSlider items={comingSoonSlides.slice(0, 4)} />
      </div>
    </section>
  );
}
