import { Marquee } from '@/components/ui/Marquee/Marquee';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { audiences, deliverableTags } from '@/data/clients';
import './ClientsStrip.css';

/** "Who we make for" headline over two counter-rotating pill strips. */
export function ClientsStrip() {
  return (
    <section className="sec s-sand clients">
      <div className="wrap">
        <TitleReveal lines={['For brands that sell.', 'For brands that tell.']} className="h2" />
        <p className="lede">
          From a first AI product ad to a full festive campaign, we make for the people behind the label.
        </p>
      </div>
      <div className="rows" aria-label="Who we make for">
        <Marquee className="pillrow" duration={46000}>
          {audiences.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Marquee>
        <Marquee className="pillrow alt" duration={52000} reverse>
          {deliverableTags.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
