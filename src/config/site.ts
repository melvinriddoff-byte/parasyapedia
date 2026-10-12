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
  /** The number as shown on the site. Tapping it opens a WhatsApp chat with `whatsapp`. */
  phone: string;
}

export const siteConfig: SiteConfig = {
  name: 'Parasya Pedia',
  tagline: 'Beyond the frame.',
  email: 'parasya.pedia@gmail.com',
  whatsapp: '918891182030',
  instagram: 'parasya.pedia',
  location: 'Thrissur, Kerala, India',
  phone: '+91 8891182030',
};

export const instagramUrl = `https://instagram.com/${siteConfig.instagram}`;
export const whatsappUrl = siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : '';
