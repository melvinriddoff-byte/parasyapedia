import { ServiceStack } from '@/components/services/ServiceStack/ServiceStack';
import { Button } from '@/components/ui/Button/Button';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import './FeaturedServices.css';

/** A pile of service cards that fans out on hover. */
export function FeaturedServices() {
  return (
    <section className="sec s-saffron featured">
      <div className="wrap head-row">
        <TitleReveal lines={['What we', 'offer.']} className="h2" />
        <div className="head-side">
          <p>AI-generated brand films, ads and short-form content, made to your brief. Hover or scroll to fan out the pile, then pick a card to see what is included.</p>
          <Button to="/services" variant="line">
            See all services
          </Button>
        </div>
      </div>
      <ServiceStack />
    </section>
  );
}
