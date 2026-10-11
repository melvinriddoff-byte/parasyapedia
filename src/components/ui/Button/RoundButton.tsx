import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon buttons have no visible text. */
  'aria-label': string;
  children: ReactNode;
}

/** Circular icon button (arrows, pause, close). */
export function RoundButton({ className, children, type = 'button', ...rest }: RoundButtonProps) {
  return (
    <button type={type} className={cx('round', className)} {...rest}>
      {children}
    </button>
  );
}
