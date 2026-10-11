import './Logo.css';

interface LogoProps {
  className?: string;
}

/**
 * The Parasya Pedia lockup from logo1.png: the rounded P mark and the wordmark.
 * Both are masks, so the mark takes --lg-fg (orange by default) and the wordmark takes the
 * surrounding text colour. The mobile menu sets both to dark to stay readable on orange.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={className ? `lockup ${className}` : 'lockup'} aria-hidden="true">
      <i className="lockup-mark" />
      <i className="lockup-word" />
    </span>
  );
}
