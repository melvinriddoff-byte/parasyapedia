import { createElement, useRef, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/utils/cx';
import './TitleReveal.css';

interface TitleRevealProps {
  /** One entry per line. Each line slides up from behind a mask. */
  lines: ReactNode[];
  as?: 'h1' | 'h2';
  className?: string;
  /** Pass -1 on page titles so the router can move focus to them. */
  tabIndex?: number;
}

/** A heading whose lines rise into view the first time it scrolls on screen. */
export function TitleReveal({ lines, as = 'h2', className, tabIndex }: TitleRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref, { threshold: 0.3, once: true });

  return createElement(
    as,
    { ref, className: cx('title-reveal', className, seen && 'in'), tabIndex },
    lines.map((line, index) => (
      <span className="mask" key={index}>
        <span style={{ '--i': index } as CSSProperties}>{line}</span>
      </span>
    )),
  );
}
