import { useId, useState, type ReactNode } from 'react';
import { cx } from '@/utils/cx';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item open at first. Pass null to start with everything closed. */
  defaultOpen?: number | null;
  className?: string;
}

/** One-open-at-a-time accordion. Colours follow the surrounding section (.s-dark / .s-light). */
export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cx('acc', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${base}-button-${index}`;
        const panelId = `${base}-panel-${index}`;
        return (
          <div key={item.id} className={cx('acc-i', isOpen && 'open')}>
            <h3 className="acc-h">
              <button
                type="button"
                id={buttonId}
                className="acc-b"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.title}
                <span className="pm" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="ans"
              {...(isOpen ? {} : { inert: '' })}
            >
              <div>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
