import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { services } from '@/data/services';
import { servicesLink } from '@/utils/links';
import './WhatWeMake.css';

/** The three services as ruled rows, each linking to the services page filtered to that type. */
export function WhatWeMake() {
  return (
    <section className="sec s-saffron make">
      <div className="wrap">
        <TitleReveal lines={['What we make.']} className="h2" />

        <ul className="make-list">
          {services.map((service) => (
            <li key={service.type}>
              <TransitionLink to={servicesLink(service.type)}>
                <h3>{service.title}</h3>
                <p className="make-sum">{service.summary}</p>
                <ul className="make-del">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ArrowIcon />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
