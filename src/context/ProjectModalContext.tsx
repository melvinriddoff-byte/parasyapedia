import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

interface ProjectModalApi {
  /** Index into data/offerings.ts of the project being shown. */
  index: number;
  open: boolean;
  openProject: (index: number, opener?: HTMLElement) => void;
  close: () => void;
}

const ProjectModalContext = createContext<ProjectModalApi | null>(null);

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const openProject = useCallback((next: number, trigger?: HTMLElement) => {
    opener.current = trigger ?? null;
    setIndex(next);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus();
  }, []);

  const value = useMemo(
    () => ({ index, open, openProject, close }),
    [index, open, openProject, close],
  );
  return <ProjectModalContext.Provider value={value}>{children}</ProjectModalContext.Provider>;
}

export function useProjectModal(): ProjectModalApi {
  const api = useContext(ProjectModalContext);
  if (!api) throw new Error('useProjectModal must be used inside <ProjectModalProvider>');
  return api;
}
