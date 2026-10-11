/**
 * Site-wide settings. Edit this file first.
 * Everything that shows an email, WhatsApp number or Instagram handle reads from here.
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  /** Studio email. The contact form builds a mailto: link to this address. */
  email: string;
  /** Digits only, with country code, e.g. "919XXXXXXXXX". Leave empty to hide WhatsApp. */
  whatsapp: string;
  /** Instagram handle without the @. */
  instagram: string;
  location: string;
}

export const siteConfig: SiteConfig = {
  name: 'Parasya Pedia',
  tagline: 'Beyond the frame.',
  email: 'hello@yourdomain.com',
  whatsapp: '',
  instagram: 'parasya.pedia',
  location: 'Kerala, India',
};

export const instagramUrl = `https://instagram.com/${siteConfig.instagram}`;
export const whatsappUrl = siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : '';
