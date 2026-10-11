import type { SVGProps } from 'react';
import { cx } from '@/utils/cx';
import './Icons.css';

type IconProps = SVGProps<SVGSVGElement>;

/** Path of the brand's four-point star (viewBox 0 0 40 40). */
export const STAR_PATH =
  'M20 0c1.2 10.2 9.8 18.8 20 20-10.2 1.2-18.8 9.8-20 20-1.2-10.2-9.8-18.8-20-20C10.2 18.8 18.8 10.2 20 0z';

export function StarIcon({ className, ...rest }: IconProps) {
  return (
    <svg
      className={cx('icon', 'icon-star', className)}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}

export function PlayIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={cx('icon', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
      <path
        fill="currentColor"
        d="M7.5 4.6v14.8c0 .6.7 1 1.2.6l11-7.4c.5-.3.5-.9 0-1.2l-11-7.4c-.5-.4-1.2 0-1.2.6z"
      />
    </svg>
  );
}

export function PauseIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={cx('icon', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
      <rect x="6" y="4.5" width="4.2" height="15" rx="1.2" fill="currentColor" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={cx('icon', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={cx('icon', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
      <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
