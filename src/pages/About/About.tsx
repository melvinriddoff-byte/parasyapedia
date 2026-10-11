import { FlipCard } from '@/components/about/FlipCard/FlipCard';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion/Accordion';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { ScrubText } from '@/components/ui/ScrubText/ScrubText';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { principles } from '@/data/principles';
import { services } from '@/data/services';
import { servicesLink } from '@/utils/links';
import './About.css';

const serviceItems: AccordionItem[] = services.map((service) => ({
  id: service.type,
  title: service.title,
  content: (
    <>
      <p>{service.details}</p>
      <ul>
        {service.deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <TransitionLink className="lnk" to={servicesLink(service.type)}>
        See {service.title.toLowerCase()}
      </TransitionLink>
    </>
  ),
}));

export function About() {
  return (
    <>
      <PageHeader
        title={['About us.']}
        lede="Parasya Pedia is an AI studio that makes brand films, ads and social content with generative AI, directed by humans."
        deco="about"
      />

      <section className="sec s-light">
        <div className="wrap">
          <ScrubText text="Generative AI does the heavy lifting. Human direction keeps it honest. We carry what a brand knows beyond the frame, and into the light." />
        </div>
      </section>

      <section className="sec s-saffron">
        <div className="wrap">
          <TitleReveal lines={['Para. Pedia.']} className="h2" />
          <p className="lede name-lede">
            In Sanskrit, para means beyond and pedia is knowledge. Tap a card to see.
          </p>
          <div className="flips">
            <FlipCard word="para" meaning="beyond" hint="past the edge of the frame" />
            <FlipCard word="pedia" meaning="knowledge" hint="what a brand knows" tone="two" />
          </div>
          <p className="mission">
            Our mission is to carry what a brand knows beyond the frame, and into the light.
          </p>
        </div>
      </section>

      <section className="sec s-soft">
        <div className="wrap">
          <TitleReveal lines={['What we believe.']} className="h2" />
          <div className="pr">
            {principles.map((principle) => (
              <article key={principle.title}>
                <div className="ico" aria-hidden="true">
                  <Shapes list={principle.icon} />
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec s-light">
        <div className="wrap two-col">
          <div className="sticky">
            <TitleReveal lines={['What we', 'make.']} className="h2" />
          </div>
          <Accordion items={serviceItems} />
        </div>
      </section>

      <CtaBand lines={['Beyond the frame', 'starts with a brief.']} />
    </>
  );
}
