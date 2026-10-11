import type { FilterOption } from '@/components/ui/FilterChips/FilterChips';
import type { WorkType } from '@/types';

export type TypeFilter = 'all' | WorkType;

export const typeFilterOptions: FilterOption<TypeFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'Brand film', label: 'AI brand films' },
  { value: 'AI ad', label: 'AI ads' },
  { value: 'Short-form content', label: 'AI short-form content' },
];

export const isWorkType = (value: string | null): value is WorkType =>
  value === 'Brand film' || value === 'AI ad' || value === 'Short-form content';
