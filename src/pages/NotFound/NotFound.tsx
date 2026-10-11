import { Mascot } from '@/components/ui/Mascot/Mascot';
import { Button } from '@/components/ui/Button/Button';
import './NotFound.css';

export function NotFound() {
  return (
    <section className="not-found s-light">
      <div className="not-found-in">
        <p className="spaced">Scene missing</p>
        <h1 tabIndex={-1}>
          This page is <span className="serif">off frame.</span>
        </h1>
        <p className="lede">The page you were looking for does not exist or has moved.</p>
        <Button to="/">Back to the opening scene</Button>
        <Mascot role="lost" pill="Where am I?" />
      </div>
    </section>
  );
}
