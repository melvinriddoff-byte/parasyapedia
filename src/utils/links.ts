import type { WorkType } from '@/types';

/** Link to the services page, optionally pre-filtered by type. */
export const servicesLink = (type?: WorkType): string =>
  type ? `/services?type=${encodeURIComponent(type)}` : '/services';
