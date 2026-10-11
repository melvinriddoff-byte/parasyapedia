import { useRef, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { PlayIcon, StarIcon } from '@/components/ui/Icons/Icons';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { useShrinkToFit } from '@/hooks/useFitText';
import { useTilt } from '@/hooks/usePointerMotion';
import './Hero.css';

const PERFORATIONS = [4.2, 26.2, 48.2, 70.2, 92.2];

/** Opening screen: headline on the left, a tilting film-frame card on the right. */
export function Hero() {
  const filmRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useTilt(filmRef);
  useShrinkToFit(headingRef, copyRef, '.hero-word');

  return (
    <section className="hero s-light">
      <div className="hero-grid">
        <div className="hero-copy" ref={copyRef}>
          <p className="hero-intro hero-fade">
            <span className="pill">AI production studio</span>
          </p>

          <h1 ref={headingRef} className="hero-title" tabIndex={-1} aria-label="Beyond the frame.">
            <span className="mask" aria-hidden="true">
              <span className="hero-word" style={{ '--i': 0 } as CSSProperties}>
                Beyond
              </span>
            </span>
            <span className="mask" aria-hidden="true">
              <span className="hero-word" style={{ '--i': 1 } as CSSProperties}>
                the <span className="serif">frame.</span>
              </span>
            </span>
          </h1>

          <p className="lede hero-fade">
            We make AI-generated brand films, ads and social content for products and brands. Cinematic
            video, imagery and sound. Made with AI, directed by humans.
          </p>

          <div className="cta-row hero-fade">
            <Button to="/services">
              <PlayIcon />
              See our services
            </Button>
            <Button to="/contact" variant="line">
              Start a project
            </Button>
          </div>
        </div>

        <div className="film-wrap hero-fade">
          <div className="film" ref={filmRef} data-cursor="View work">
            <TransitionLink to="/services" className="film-link" aria-label="See our services">
              <div className="film-in">
                {PERFORATIONS.map((top) => (
                  <span key={top} className="perf" style={{ top: `${top}%` }} />
                ))}
                <div className="f-sun" data-depth={14}>
                  <div className="sun-core">
                    <PlayIcon />
                  </div>
                </div>
                <div className="f-arch" data-depth={6}>
                  <i />
                </div>
                <div className="f-pill" data-depth={22}>
                  <i />
                </div>
                <div className="f-star" data-depth={32}>
                  <StarIcon />
                </div>
                <span className="f-tag">Scene 01 &middot; Take 01</span>
              </div>
            </TransitionLink>
            <Mascot role="hero" pill="Roll camera!" depth={26} />
          </div>
        </div>
      </div>
    </section>
  );
}
