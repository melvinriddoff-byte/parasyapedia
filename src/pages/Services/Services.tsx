import { useSearchParams } from 'react-router-dom';
import { ServiceCard } from '@/components/services/ServiceCard/ServiceCard';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { FilterBar } from '@/components/ui/FilterChips/FilterChips';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { isWorkType, typeFilterOptions, type TypeFilter } from '@/data/filters';
import { offerings } from '@/data/offerings';
import { useFadeFilter } from '@/hooks/useFadeFilter';
import { cx } from '@/utils/cx';
import './Services.css';

/** Services page. The filter lives in the URL (?type=AI%20ad) so it can be linked to. */
export function Services() {
  const [params, setParams] = useSearchParams();
  const rawType = params.get('type');
  const target: TypeFilter = isWorkType(rawType) ? rawType : 'all';
  const { shown, fading } = useFadeFilter<TypeFilter>(target);

  const visible = offerings
    .map((offering, index) => ({ offering, index }))
    .filter(({ offering }) => shown === 'all' || offering.type === shown);

  return (
    <>
      <PageHeader
        title={['What we', 'offer.']}
        lede="AI-generated brand films, ads and short-form content, from launch films to festive reels. Tap any service to see what is included."
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
          <div className={cx('service-grid', fading && 'fading')}>
            {visible.map(({ offering, index }) => (
              <ServiceCard key={offering.id} offering={offering} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lines={['Need one of', 'these?']} />
    </>
  );
}
