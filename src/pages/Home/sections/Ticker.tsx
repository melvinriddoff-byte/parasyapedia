import { Marquee } from '@/components/ui/Marquee/Marquee';
import { StarIcon } from '@/components/ui/Icons/Icons';

const WORDS = ['AI brand films', 'AI ads', 'AI social content'];

/** Orange strip of scrolling brand words under the hero. */
export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <Marquee duration={38000}>
        {WORDS.map((word) => (
          <span key={word}>
            {word}
            <StarIcon />
          </span>
        ))}
        <span className="ml" lang="ml">
          ഭാവന
          <StarIcon />
        </span>
        <span>
          Ideas in. Ads out.
          <StarIcon />
        </span>
      </Marquee>
    </div>
  );
}
