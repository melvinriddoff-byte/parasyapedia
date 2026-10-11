import { cx } from '@/utils/cx';
import './FilterChips.css';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterBarProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter by type". */
  label: string;
  /** Text such as "Showing 3 of 6 services". Read out when it changes. */
  count?: string;
  className?: string;
}

/** A row of toggle chips plus a live result count. */
export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
  count,
  className,
}: FilterBarProps<T>) {
  return (
    <div className={cx('filters', className)}>
      <div className="chips" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className="chip-b"
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {count !== undefined && (
        <p className="count" aria-live="polite">
          {count}
        </p>
      )}
    </div>
  );
}
