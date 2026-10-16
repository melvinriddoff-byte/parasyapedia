import { useMemo, useRef, type ComponentType } from 'react';
import CardSwapSource from '@/components/services/CardSwap/CardSwap';
import { useProjectModal } from '@/context/ProjectModalContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Offering } from '@/types';
import { offeringCardImage } from '@/utils/cardArt';
import './ServiceCardSwap.css';

// CardSwap is untyped JavaScript, so its props are described loosely here.
const CardSwap = CardSwapSource as unknown as ComponentType<Record<string, unknown>>;

interface ServiceCardSwapProps {
  /** The offerings to show, in order. */
  items: Offering[];
  /** Index of each item in data/offerings.ts (the project modal needs it). */
  indices: number[];
}

/**
 * The services as a stack of cards. The front card swaps to the back every few seconds, a card
 * can be dragged or flung away, and clicking a card behind brings it to the front. Clicking the
 * front card opens its details. Each card is drawn from the offering's artwork.
 */
export function ServiceCardSwap({ items, indices }: ServiceCardSwapProps) {
  const { openProject } = useProjectModal();
  const hostRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef(0);
  const narrow = useMediaQuery('(max-width: 700px)');

  const cards = useMemo(
    () => items.map((offering) => ({ title: offering.title, image: offeringCardImage(offering), alt: offering.title })),
    [items],
  );

  return (
    <div className="service-swap" ref={hostRef}>
      <div className="service-swap-stage">
        <CardSwap
          items={cards}
          width={narrow ? 240 : 360}
          height={narrow ? 310 : 440}
          cardDistance={narrow ? 28 : 60}
          verticalDistance={narrow ? 36 : 70}
          depth={narrow ? 70 : 90}
          skewAmount={6}
          visibleCards={narrow ? 3 : 4}
          cardRadius={18}
          delay={4000}
          speed={1}
          bounce={0.35}
          parallax={0.5}
          hoverSpread={0.12}
          dim={0.5}
          theme="brand"
          autoplay
          pauseOnHover
          draggable
          onChange={(index: number) => {
            frontRef.current = index;
          }}
          onCardClick={(index: number) => {
            // a click on the front card opens it; a click on a card behind only brings it forward
            if (index === frontRef.current) openProject(indices[index], hostRef.current ?? undefined);
          }}
        />
      </div>
      <p className="service-swap-hint">
        Drag the top card away, or tap one behind it. Tap the top card to see what is included.
      </p>
    </div>
  );
}
