import { Shapes } from '@/components/ui/Shapes/Shapes';
import { useProjectModal } from '@/context/ProjectModalContext';
import type { Offering } from '@/types';
import './ServiceCard.css';

interface ServiceCardProps {
  offering: Offering;
  /** Index of this offering in data/offerings.ts (used to open the right modal). */
  index: number;
}

/** A project tile. Tapping it opens the project modal. */
export function ServiceCard({ offering, index }: ServiceCardProps) {
  const { openProject } = useProjectModal();

  return (
    <button
      type="button"
      className="card"
      data-cursor="View"
      onClick={(event) => openProject(index, event.currentTarget)}
    >
      <div className="art" style={{ background: `var(--${offering.background})` }}>
        <Shapes list={offering.shapes} />
      </div>
      <div className="meta">
        <span className="tag">{offering.tag}</span>
        <span className="con">From {offering.duration}</span>
      </div>
      <h3>{offering.title}</h3>
    </button>
  );
}
