import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { CloseIcon } from '@/components/ui/Icons/Icons';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { useProjectModal } from '@/context/ProjectModalContext';
import { useTransitionNavigate } from '@/context/TransitionContext';
import { offerings } from '@/data/offerings';
import { useBodyLock } from '@/hooks/useBodyLock';
import type { BriefPrefill } from '@/types';
import { cx } from '@/utils/cx';
import './ProjectModal.css';

/** Details dialog for one project. Mounted once in Layout and driven by ProjectModalContext. */
export function ProjectModal() {
  const { index, open, close } = useProjectModal();
  const go = useTransitionNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const offering = offerings[index];

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const briefUs = () => {
    const prefill: BriefPrefill = {
      type: offering.type,
      message: `I am interested in “${offering.title}”. `,
    };
    close();
    go('/contact', prefill);
  };

  return (
    <div
      className={cx('modal', open && 'open')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="mp" ref={dialogRef}>
        <button type="button" className="mp-close" ref={closeRef} aria-label="Close" onClick={close}>
          <CloseIcon />
        </button>
        <div className="mp-art" style={{ background: `var(--${offering.background})` }}>
          <Shapes list={offering.shapes} />
        </div>
        <div className="mp-body">
          <span className="spaced">{offering.tag} / Service</span>
          <h3 id="project-title">{offering.title}</h3>
          <p>{offering.description}</p>
          <ul>
            {offering.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div>
            <Button onClick={briefUs}>Brief us on this</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
