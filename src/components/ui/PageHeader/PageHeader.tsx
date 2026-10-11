import { useRef, type ReactNode } from 'react';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { decos } from '@/data/decos';
import { useParallax } from '@/hooks/usePointerMotion';
import type { DecoKey } from '@/types';
import { cx } from '@/utils/cx';
import './PageHeader.css';

interface PageHeaderProps {
  /** Title lines (rendered inside the page's single <h1>). */
  title: ReactNode[];
  lede: string;
  deco: DecoKey;
  className?: string;
}

/** Dark hero band at the top of every inner page. */
export function PageHeader({ title, lede, deco, className }: PageHeaderProps) {
  const decoRef = useRef<HTMLDivElement>(null);
  useParallax(decoRef);
  const hasMascot = deco === 'testimonials' || deco === 'about';

  return (
    <section className={cx('ph', 's-light', className)}>
      <div className="ph-grid">
        <div>
          <TitleReveal as="h1" lines={title} className="ph-title" tabIndex={-1} />
          <p className="lede">{lede}</p>
        </div>
        <div className="deco" ref={decoRef} >
          <Shapes list={decos[deco]} />
          {deco === 'testimonials' && (
            <span className="qmark" aria-hidden="true">
              “
            </span>
          )}
          {hasMascot && <Mascot role="art" />}
        </div>
      </div>
    </section>
  );
}
