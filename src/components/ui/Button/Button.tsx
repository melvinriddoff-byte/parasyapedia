import type { MouseEventHandler, ReactNode } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { cx } from '@/utils/cx';
import './Button.css';

type Variant = 'ember' | 'dark' | 'line';

interface ButtonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Internal route (plays the page transition). */
  to?: string;
  /** Router state to pass along with `to`. */
  state?: unknown;
  /** External link. */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
}

/** One button for every case: internal link, external link or plain button. */
export function Button({
  variant = 'ember',
  className,
  children,
  to,
  state,
  href,
  type = 'button',
  onClick,
}: ButtonProps) {
  const classes = cx('btn', `btn-${variant}`, className);

  if (to) {
    return (
      <TransitionLink className={classes} to={to} state={state} onClick={onClick}>
        {children}
      </TransitionLink>
    );
  }
  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
