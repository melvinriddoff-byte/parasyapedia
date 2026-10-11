import { useState } from 'react';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard/TestimonialCard';
import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider/TestimonialSlider';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { FilterBar } from '@/components/ui/FilterChips/FilterChips';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { siteConfig } from '@/config/site';
import { typeFilterOptions, type TypeFilter } from '@/data/filters';
import { testimonials } from '@/data/testimonials';
import { useFadeFilter } from '@/hooks/useFadeFilter';
import { cx } from '@/utils/cx';
import './Testimonials.css';

export function Testimonials() {
  const [filter, setFilter] = useState<TypeFilter>('all');
  const { shown, fading } = useFadeFilter<TypeFilter>(filter);

  const visible = testimonials
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => shown === 'all' || item.category === shown);

  return (
    <>
      <PageHeader
        title={['Kind words.']}
        lede="What brands say about their AI-generated films and ads."
        deco="testimonials"
        className="testimonials-header"
      />

      <section className="testimonials-slider s-soft">
        <div className="wrap">
          {siteConfig.sampleTestimonials && (
            <p className="sample-note">
              These are sample testimonials. Replace them with real client quotes before you publish.
            </p>
          )}
          <TestimonialSlider items={testimonials} />
        </div>
      </section>

      <section className="sec s-light">
        <div className="wrap">
          <FilterBar
            options={typeFilterOptions}
            value={filter}
            onChange={setFilter}
            label="Filter by type"
            count={`Showing ${visible.length} of ${testimonials.length} testimonials`}
          />
          <div className={cx('tgrid', fading && 'fading')}>
            {visible.map(({ item, index }) => (
              <TestimonialCard key={index} item={item} tone={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lines={['Be our next', 'happy client.']} />
    </>
  );
}
