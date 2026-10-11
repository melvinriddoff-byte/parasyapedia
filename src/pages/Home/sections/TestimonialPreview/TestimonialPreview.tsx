import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider/TestimonialSlider';
import { Button } from '@/components/ui/Button/Button';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { testimonials } from '@/data/testimonials';

/** The first four testimonials in a slider, with a link to the full page. */
export function TestimonialPreview() {
  return (
    <section className="sec s-soft">
      <div className="wrap">
        <div className="head-row">
          <TitleReveal lines={['What clients', 'say.']} className="h2" />
          <Button to="/testimonials" variant="line">
            Read all testimonials
          </Button>
        </div>
        <TestimonialSlider items={testimonials.slice(0, 4)} />
      </div>
    </section>
  );
}
