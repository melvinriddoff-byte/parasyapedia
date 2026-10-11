import { siteConfig } from '@/config/site';
import type { Testimonial } from '@/types';
import './TestimonialCard.css';

interface TestimonialCardProps {
  item: Testimonial;
  /** 0 to 5. Picks the card's brand colour. */
  tone: number;
}

/** A single quote card in the testimonials grid. */
export function TestimonialCard({ item, tone }: TestimonialCardProps) {
  return (
    <figure className={`tcard tc${tone % 6}`}>
      {siteConfig.sampleTestimonials && <b className="sample">Sample</b>}
      <span className="qm2" aria-hidden="true">
        “
      </span>
      <blockquote>{item.quote}</blockquote>
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.role}</span>
      </figcaption>
      <span className="tg">{item.category}</span>
    </figure>
  );
}
