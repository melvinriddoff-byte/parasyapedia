import { useRef, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { useShrinkToFit } from '@/hooks/useFitText';
import './Hero.css';

/** Opening screen: headline and the brief CTA on the left, the prompt-to-frame hero image (public/hero-bg.webp) on the right with the mascot. */
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
            AI-generated brand films, ads and short-form content for your product. Directed by people in
            Thrissur, Kerala, and checked against your real pack, colours and logo before you see a frame.
          </p>

          <div className="cta-row hero-fade">
            <Button to="/contact">Send a brief</Button>
            <TransitionLink className="hero-link" to="/services">
              See what we make
              <ArrowIcon />
            </TransitionLink>
          </div>

          <p className="hero-langs hero-fade">
            Delivered in Malayalam, Hindi, Tamil, Arabic or English
          </p>
        </div>

        <div className="film-wrap hero-fade">
          <div className="film">
            <Mascot role="hero" pill="Roll camera!" />
          </div>
        </div>
      </div>

      <p className="hero-caption hero-fade">Illustrated concept</p>
    </section>
  );
}
