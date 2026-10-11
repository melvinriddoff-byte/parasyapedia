import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findRoute } from '@/data/routes';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type TransitionPhase = 'idle' | 'in' | 'out';

interface TransitionState {
  phase: TransitionPhase;
  name: string;
}

interface TransitionApi {
  state: TransitionState;
  /** Navigates with the "scene cut" animation. Pass router state to carry data to the next page. */
  go: (to: string, routerState?: unknown) => void;
}

const COVER_MS = 680;
const REVEAL_MS = 720;
const IDLE: TransitionState = { phase: 'idle', name: '' };

const TransitionContext = createContext<TransitionApi | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const [state, setState] = useState<TransitionState>(IDLE);
  const busy = useRef(false);

  const go = useCallback(
    (to: string, routerState?: unknown) => {
      if (busy.current) return;
      const url = new URL(to, window.location.origin);

      if (url.pathname === location.pathname) {
        navigate(to, { state: routerState });
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        return;
      }
      if (reduce) {
        navigate(to, { state: routerState });
        return;
      }

      busy.current = true;
      setState({
        phase: 'in',
        name: findRoute(url.pathname).label,
      });
      window.setTimeout(() => {
        navigate(to, { state: routerState });
        setState((prev) => ({ ...prev, phase: 'out' }));
        window.setTimeout(() => {
          setState(IDLE);
          busy.current = false;
        }, REVEAL_MS);
      }, COVER_MS);
    },
    [location.pathname, navigate, reduce],
  );

  const value = useMemo(() => ({ state, go }), [state, go]);
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

function useTransitionApi(): TransitionApi {
  const api = useContext(TransitionContext);
  if (!api) throw new Error('useTransition must be used inside <TransitionProvider>');
  return api;
}

export const useTransitionNavigate = () => useTransitionApi().go;
export const useTransitionState = () => useTransitionApi().state;
