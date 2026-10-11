import { BriefForm } from '@/components/contact/BriefForm/BriefForm';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { Mascot } from '@/components/ui/Mascot/Mascot';
import { PageHeader } from '@/components/ui/PageHeader/PageHeader';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { instagramUrl, siteConfig, whatsappUrl } from '@/config/site';
import { faq } from '@/data/faq';
import './Contact.css';

const faqItems = faq.map((item) => ({
  id: item.question,
  title: item.question,
  content: <p>{item.answer}</p>,
}));

export function Contact() {
  return (
    <>
      <PageHeader
        title={["Let's make your", 'first frame.']}
        lede="Tell us about your product. We will reply with ideas for your AI-generated film or ad, not a price list."
        deco="contact"
      />

      <section className="sec s-ember">
        <div className="wrap contact-grid">
          <div className="info">
            <p className="lede">Prefer to write directly? Reach us here.</p>
            <ul>
              <li>
                <small>Email</small>
                <a className="mail" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              {whatsappUrl && (
                <li>
                  <small>WhatsApp</small>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Message us
                  </a>
                </li>
              )}
              <li>
                <small>Instagram</small>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  @{siteConfig.instagram}
                </a>
              </li>
              <li>
                <small>Studio</small>
                <span className="place">{siteConfig.location}</span>
              </li>
            </ul>
            <Mascot role="contact" pill="Say hi!" />
          </div>
          <BriefForm />
        </div>
      </section>

      <section className="sec s-light">
        <div className="wrap two-col">
          <div className="sticky">
            <TitleReveal lines={['Questions,', 'answered.']} className="h2" />
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
