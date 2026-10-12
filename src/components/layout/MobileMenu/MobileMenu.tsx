import type { CSSProperties } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { ROUTES } from '@/data/routes';
import { instagramUrl, siteConfig } from '@/config/site';
import { cx } from '@/utils/cx';
import './MobileMenu.css';

interface MobileMenuProps {
  open: boolean;
  pathname: string;
  /** Called when a link is tapped, so the menu closes even when the link points at the current page. */
  onClose: () => void;
}

/** Full-screen orange menu for small screens. */
export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  return (
    <div id="mobile-menu" className={cx('menu', open && 'open')} aria-hidden={!open}>
      <nav className="m-links" aria-label="Mobile">
        {ROUTES.map((route, index) => (
          <TransitionLink
            key={route.path}
            to={route.path}
            className={cx('m', pathname === route.path && 'active')}
            style={{ '--i': index } as CSSProperties}
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            {route.label}
          </TransitionLink>
        ))}
      </nav>
      <div className="m-foot">
        <span>Say hello</span>
        <a href={`mailto:${siteConfig.email}`} tabIndex={open ? 0 : -1} onClick={onClose}>
          {siteConfig.email}
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
          @{siteConfig.instagram}
        </a>
      </div>
    </div>
  );
}
