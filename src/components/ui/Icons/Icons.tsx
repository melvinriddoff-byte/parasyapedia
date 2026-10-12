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

/** Outline contact icons: thin strokes, no fill, drawn in the current text colour. */
function OutlineIcon({ className, children, ...rest }: IconProps) {
  return (
    <svg
      className={cx('icon', 'icon-outline', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MailIcon = (props: IconProps) => (
  <OutlineIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <polyline points="3.5,7.5 12,13.5 20.5,7.5" />
  </OutlineIcon>
);

export const InstagramIcon = (props: IconProps) => (
  <OutlineIcon {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" />
  </OutlineIcon>
);

export const WhatsAppIcon = (props: IconProps) => (
  <OutlineIcon {...props}>
    <path d="M3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 8.2 19.4L3.5 20.5z" />
    <path d="M9.3 8.4c-.3.4-.4 1-.1 1.7a7.6 7.6 0 0 0 4.5 4.3c.7.2 1.3.1 1.7-.3l.5-.7-1.8-1-.8.6c-.9-.3-1.7-1.1-2-2l.6-.8-1-1.8-.8.1z" />
  </OutlineIcon>
);

export const PinIcon = (props: IconProps) => (
  <OutlineIcon {...props}>
    <path d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </OutlineIcon>
);
