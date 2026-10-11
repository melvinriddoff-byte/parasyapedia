import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { Loader } from '@/components/layout/Loader/Loader';
import { PageTransition } from '@/components/layout/PageTransition/PageTransition';
import { ScrollProgress } from '@/components/layout/ScrollProgress/ScrollProgress';
import { ProjectModal } from '@/components/services/ProjectModal/ProjectModal';
import { findRoute } from '@/data/routes';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import './Layout.css';

/** Wraps every page: header, footer, page transition and the shared effects. */
export function Layout() {
  useSmoothScroll();
  const { pathname } = useLocation();
  const route = findRoute(pathname);
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  // The hero headline waits for the loader to finish.
  useEffect(() => {
    if (loaded) document.documentElement.classList.add('is-ready');
  }, [loaded]);

  // One place for page-level side effects on every route change.
  useEffect(() => {
    document.title = route.title;
  }, [route.title]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('#main h1')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="sr" role="status" aria-live="polite">
        Now viewing {route.label}
      </div>

      <Loader onDone={handleLoaded} />
      <ScrollProgress />
      <Header />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
      <ProjectModal />
      <PageTransition />
    </>
  );
}
