import { StretchCards } from '@/components/services/StretchCards/StretchCards';
import { Button } from '@/components/ui/Button/Button';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import './FeaturedServices.css';

/** One service card that stretches from service to service. */
export function FeaturedServices() {
  return (
    <section className="sec s-saffron featured">
      <div className="wrap head-row">
        <TitleReveal lines={['What we', 'offer.']} className="h2" />
        <div className="head-side">
          <p>AI-generated brand films, ads and short-form content, made to your brief. Watch the card stretch from one service to the next, then click it to see what is included.</p>
          <Button to="/services" variant="line">
            See all services
          </Button>
        </div>
      </div>
      <StretchCards />
    </section>
  );
}
