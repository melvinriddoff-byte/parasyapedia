import { Mascot } from '@/components/ui/Mascot/Mascot';
import { StarIcon } from '@/components/ui/Icons/Icons';
import { useTransitionState } from '@/context/TransitionContext';
import { cx } from '@/utils/cx';
import './PageTransition.css';

/** Orange "scene cut" panel that sweeps over the page while the route changes. */
export function PageTransition() {
  const { phase, name } = useTransitionState();

  return (
    <div className={cx('trans', phase === 'in' && 'in', phase === 'out' && 'out')} aria-hidden="true">
      <div>
        <StarIcon className="trans-star" />
        <strong>{name}</strong>
      </div>
      {phase !== 'idle' && <Mascot role="transition" />}
    </div>
  );
}
