import { Marquee } from '@/components/ui/Marquee/Marquee';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { audiences, deliverableTags } from '@/data/clients';
import './ClientsStrip.css';

/** "Who we make for" heading over two counter-rotating pill strips. */
export function ClientsStrip() {
  return (
    <section className="sec s-sand clients">
      <div className="wrap">
        <TitleReveal lines={['Who we make for.']} className="h2" />
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
