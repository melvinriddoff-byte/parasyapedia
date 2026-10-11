import { ServiceRow } from '@/components/services/ServiceRow/ServiceRow';
import { Button } from '@/components/ui/Button/Button';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import './FeaturedServices.css';

/** Swipeable preview of our services. */
export function FeaturedServices() {
  return (
    <section className="sec s-saffron featured">
      <div className="wrap head-row">
        <TitleReveal lines={['What we', 'offer.']} className="h2" />
        <div className="head-side">
          <p>AI-generated brand films, ads and short-form content, made to your brief. Tap a card to see what is included.</p>
          <Button to="/services" variant="line">
            See all services
          </Button>
        </div>
      </div>
      <ServiceRow />
    </section>
  );
}
