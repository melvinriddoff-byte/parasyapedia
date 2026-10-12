import { useRef } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { ArrowIcon, InstagramIcon, MailIcon, PinIcon, WhatsAppIcon } from '@/components/ui/Icons/Icons';
import { Logo } from '@/components/ui/Logo/Logo';
import { TransitionLink } from '@/components/ui/TransitionLink/TransitionLink';
import { instagramUrl, siteConfig, whatsappUrl } from '@/config/site';
import { ROUTES } from '@/data/routes';
import { services } from '@/data/services';
import { useFitWidth } from '@/hooks/useFitText';
import { servicesLink } from '@/utils/links';
import './Footer.css';

/** Site footer: brand, links, contact details, giant wordmark and back-to-top. */
export function Footer() {
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  useFitWidth(wordmarkRef);

  return (
    <footer className="foot s-soft">
      <div className="wrap">
        <div className="fg">
          <div>
            <TransitionLink className="logo" to="/" aria-label="Parasya Pedia, home">
              <Logo />
            </TransitionLink>
            <p className="blurb">
              An AI studio that makes brand films, ads and social content with generative AI. Made with
              AI, directed by humans.
            </p>
            <Button to="/contact">Start a project</Button>
          </div>

          <nav aria-label="Explore">
            <h4>Explore</h4>
            <ul>
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <TransitionLink to={route.path}>{route.label}</TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="What we make">
            <h4>What we make</h4>
            <ul>
              {services.map((service) => (
                <li key={service.type}>
                  <TransitionLink to={servicesLink(service.type)}>{service.title}</TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <MailIcon />
                  {siteConfig.email}
                </a>
              </li>
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${siteConfig.phone}`}>
                    <WhatsAppIcon />
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />@{siteConfig.instagram}
                </a>
              </li>
            </ul>
            <address>
              <PinIcon />
              {siteConfig.location}
            </address>
          </div>
        </div>

        <p className="big" ref={wordmarkRef} aria-label="parasya pedia">
          parasya <em>pedia</em>
        </p>

        <div className="fb">
          <span>&copy; {new Date().getFullYear()} Parasya Pedia. All rights reserved.</span>
          <span className="spaced">Beyond &middot; the &middot; frame</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top
            <ArrowIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
