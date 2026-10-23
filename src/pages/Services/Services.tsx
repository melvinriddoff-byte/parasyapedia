import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { FilterBar } from '@/components/ui/FilterChips/FilterChips';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { isWorkType, typeFilterOptions, type TypeFilter } from '@/data/filters';
import { offerings } from '@/data/offerings';
import { useFadeFilter } from '@/hooks/useFadeFilter';
import type { BriefPrefill, Offering } from '@/types';
import { cx } from '@/utils/cx';
import './Services.css';

/** What comes with every project, whichever service it starts from (see PRODUCT.md). */
const INCLUDED = [
  { title: 'Checked against your product', text: 'Every frame is checked against your real pack, colours and logo.' },
  { title: 'Your sign-off at each stage', text: 'You approve the brief, the frames and the final cut.' },
  { title: 'In your language', text: 'Captions and voice in Malayalam, Hindi, Tamil, Arabic or English.' },
  { title: 'Every size you post', text: '9:16 for Reels and Shorts, 1:1 for feeds, 16:9 for ads and web.' },
];

const prefill = (offering: Offering): BriefPrefill => ({
  type: offering.type,
  message: `I am interested in “${offering.title}”. `,
});

/** One service as a ruled row: its artwork, what it is, what you get, and a brief pre-filled with it. */
function ServiceRow({ offering }: { offering: Offering }) {
  return (
    <li className="svc-row" id={offering.id}>
      <div className="svc-art" style={{ background: `var(--${offering.background})` }} aria-hidden="true">
        <Shapes list={offering.shapes} />
      </div>
      <div className="svc-main">
        <p className="svc-meta">
          <span className="svc-tag">{offering.tag}</span>
          <span>{offering.duration}</span>
        </p>
        <h2>{offering.title}</h2>
        <p className="svc-desc">{offering.description}</p>
      </div>
      <div className="svc-side">
        <h3>You get</h3>
        <ul>
          {offering.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Button to="/contact" state={prefill(offering)}>
          Brief us on this
        </Button>
      </div>
    </li>
  );
}

/**
 * Services page. Every service is visible at once as a ruled row, so a visitor can compare them and
 * brief us on the closest one. The filter lives in the URL (?type=AI%20ad) so it can be linked to.
 */
export function Services() {
  const [params, setParams] = useSearchParams();
  const rawType = params.get('type');
  const target: TypeFilter = isWorkType(rawType) ? rawType : 'all';
  const { shown, fading } = useFadeFilter<TypeFilter>(target);
  const visible = offerings.filter((offering) => shown === 'all' || offering.type === shown);

  return (
    <>
      <PageHeader
        title={['What we', 'offer.']}
        lede="Six things brands ask us for most. Pick the closest one and brief us on it; we shape it to your product, your story and your language."
        deco="services"
      />

      <section className="sec s-light services-body">
        <div className="wrap">
          <div className="perch">
            <Mascot role="peek" />
            <FilterBar
              options={typeFilterOptions}
              value={target}
              onChange={(value) => setParams(value === 'all' ? {} : { type: value }, { replace: true })}
              label="Filter by type"
              count={`Showing ${visible.length} of ${offerings.length} services`}
            />
          </div>

          <ul className={cx('svc-list', fading && 'fading')}>
            {visible.map((offering) => (
              <ServiceRow key={offering.id} offering={offering} />
            ))}
          </ul>
        </div>
      </section>

      <section className="sec s-saffron included">
        <div className="wrap">
          <TitleReveal lines={['Every project', 'includes.']} className="h2" />
          <ul className="included-list">
            {INCLUDED.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lines={['Not sure which', 'one fits?']} label="Send a brief" direct />
    </>
  );
}
