import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { services } from '@/data/services';
import { servicesLink } from '@/utils/links';

/** Short pitch plus the three things the studio makes, each linking to a filtered services page. */
export function Intro() {
  return (
    <section className="sec s-light">
      <div className="wrap intro-grid">
        <TitleReveal lines={['Ideas in.', 'Ads out.']} className="h2" />
        <div>
          <p className="lede">
            Parasya Pedia makes AI-generated brand films, ads and social content. Give us a product, a brand
            or a story and we hand back AI-made ads you can post, play and sell with.
          </p>
          <div className="svc">
            {services.map((service) => (
              <TransitionLink key={service.type} to={servicesLink(service.type)}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ArrowIcon />
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
