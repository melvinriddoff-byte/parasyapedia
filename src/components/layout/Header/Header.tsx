import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileMenu } from '@/components/layout/MobileMenu/MobileMenu';
import { Button } from '@/components/ui/Button/Button';
import { Logo } from '@/components/ui/Logo/Logo';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { ROUTES } from '@/data/routes';
import { useBodyLock } from '@/hooks/useBodyLock';
import { useNavVisibility } from '@/hooks/useNavVisibility';
import { cx } from '@/utils/cx';
import './Header.css';

/** Fixed site header: logo, page links, call-to-action and the mobile menu button. */
export function Header() {
  const { pathname } = useLocation();
  const { solid, hidden } = useNavVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyLock(menuOpen);

  // Close the menu when the page changes, on Escape, and when the screen gets wide.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1040) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <>
      <header className={cx('nav', solid && 'solid', hidden && 'hide', menuOpen && 'on-menu')}>
        <TransitionLink className="logo" to="/" aria-label="Parasya Pedia, home">
          <Logo />
        </TransitionLink>

        <nav className="nav-links" aria-label="Primary">
          {ROUTES.map((route) => (
            <TransitionLink
              key={route.path}
              to={route.path}
              className={cx(isActive(route.path) && 'active')}
              aria-current={isActive(route.path) ? 'page' : undefined}
            >
              {route.label}
            </TransitionLink>
          ))}
        </nav>

        <Button to="/contact" variant="ember">
          Start a project
        </Button>

        <button
          type="button"
          className="burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
        </button>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </>
  );
}
