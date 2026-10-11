import { useRef, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { PlayIcon } from '@/components/ui/Icons/Icons';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { useShrinkToFit } from '@/hooks/useFitText';
import { PromptToFrame } from './PromptToFrame/PromptToFrame';
import './Hero.css';

/** Opening screen: headline on the left, the animated prompt-to-frame panel on the right (the panel itself stays still). */
export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

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
          <div className="film">
            <PromptToFrame />
            <Mascot role="hero" pill="Roll camera!" />
          </div>
        </div>
      </div>
    </section>
  );
}
