import { useEffect, useRef, useState } from 'react';
import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { CloseIcon, InstagramIcon, PlayIcon } from '@/components/ui/Icons/Icons';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { works } from '@/data/works';
import type { Work } from '@/types';
import { cx } from '@/utils/cx';
import './Works.css';

const pad = (n: number) => String(n).padStart(2, '0');

const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

interface CardProps {
  work: Work;
  index: number;
  playing: boolean;
  onPlay: () => void;
  onStop: () => void;
}

/**
 * One piece: cover, number and type tag, title, client line and byline. The play button plays the
 * film inside the cover when there is a file for it; otherwise it opens the reel on Instagram.
 */
function WorkCard({ work, index, playing, onPlay, onStop }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => onStop());
  }, [playing, onStop]);

  return (
    <li id={work.id} className={cx('work-card', playing && 'playing')}>
      <div className="work-cover">
        <img src={work.poster} alt="" loading={index < 3 ? 'eager' : 'lazy'} />

        {playing && work.src && (
          <video
            ref={videoRef}
            src={work.src}
            poster={work.poster}
            controls
            playsInline
            onEnded={onStop}
            aria-label={`${work.title}, ${work.type} for ${work.client}`}
          />
        )}

        {playing ? (
          <button type="button" className="work-play work-close" onClick={onStop} aria-label={`Stop ${work.title}`}>
            <CloseIcon />
          </button>
        ) : work.src ? (
          <button type="button" className="work-play" onClick={onPlay} aria-label={`Play ${work.title}`}>
            <PlayIcon />
          </button>
        ) : (
          <a
            className="work-play"
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${work.title} on Instagram (opens in a new tab)`}
          >
            <PlayIcon />
          </a>
        )}
      </div>

      <div className="work-tags">
        <span className="work-n">{pad(index + 1)}</span>
        <span className="work-tag">{work.type}</span>
      </div>
      <h2 className="work-title">
        {work.href ? (
          <a href={work.href} target="_blank" rel="noopener noreferrer">
            {work.title}
            <InstagramIcon className="work-ig" aria-hidden="true" />
            <span className="sr"> (on Instagram, opens in a new tab)</span>
          </a>
        ) : (
          work.title
        )}
      </h2>
      <p className="work-desc">
        {work.client === 'Parasya Pedia' ? 'A studio concept, made with AI.' : `Made with AI for ${work.client}.`}
      </p>
      <p className="work-byline">
        <span className="work-avatar" aria-hidden="true" />
        <span>
          by <b>Parasya Pedia</b>
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={work.date}>{dateLabel(work.date)}</time>
      </p>
    </li>
  );
}

/** Works page: an editorial grid of cards, three across on desktop. One film plays at a time. */
export function Works() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const stop = useRef(() => setPlayingId(null)).current;

  return (
    <>
      <section className="works s-light">
        <div className="wrap">
          <header className="works-head">
            <TitleReveal as="h1" lines={['Films we have', 'made lately.']} className="works-title" tabIndex={-1} />
            <p>Films, ads and reels we generated with AI and directed in Thrissur. Press play to watch one.</p>
          </header>

          <ol className="works-grid">
            {works.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                index={index}
                playing={playingId === work.id}
                onPlay={() => setPlayingId(work.id)}
                onStop={stop}
              />
            ))}
          </ol>
        </div>
      </section>

      <CtaBand lines={['Be our next', 'happy client.']} />
    </>
  );
}
