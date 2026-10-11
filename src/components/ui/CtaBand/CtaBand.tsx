import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { StarIcon } from '@/components/ui/Icons/Icons';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import './CtaBand.css';

interface CtaBandProps {
  /** Heading lines. */
  lines: ReactNode[];
  to?: string;
  label?: string;
}

/** Full-width orange call-to-action used at the bottom of most pages. */
export function CtaBand({ lines, to = '/contact', label = 'Start a project' }: CtaBandProps) {
  return (
    <section className="cta s-ember">
      <StarIcon className="cta-star" />
      <div className="cta-in">
        <TitleReveal lines={lines} className="h2" />
        <Button to={to} variant="dark">
          {label}
        </Button>
      </div>
    </section>
  );
}
