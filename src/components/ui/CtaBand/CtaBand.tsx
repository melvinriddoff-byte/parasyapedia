import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { MailIcon, StarIcon, WhatsAppIcon } from '@/components/ui/Icons/Icons';
import { siteConfig, whatsappUrl } from '@/config/site';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import './CtaBand.css';

interface CtaBandProps {
  /** Heading lines. */
  lines: ReactNode[];
  to?: string;
  label?: string;
  /** Also offer WhatsApp and email, for visitors who would rather not fill in the brief form. */
  direct?: boolean;
}

/** Full-width orange call-to-action used at the bottom of most pages. */
export function CtaBand({ lines, to = '/contact', label = 'Start a project', direct = false }: CtaBandProps) {
  return (
    <section className="cta s-ember">
      <StarIcon className="cta-star" />
      <div className="cta-in">
        <TitleReveal lines={lines} className="h2" />
        <div className="cta-actions">
          <Button to={to} variant="dark">
            {label}
          </Button>
          {direct && (
            <div className="cta-direct">
              <p>Or reach us directly:</p>
              <ul>
                {whatsappUrl && (
                  <li>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                  </li>
                )}
                <li>
                  <a href={`mailto:${siteConfig.email}`}>
                    <MailIcon />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
