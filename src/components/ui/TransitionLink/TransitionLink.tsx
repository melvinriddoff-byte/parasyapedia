import { Link, type LinkProps } from 'react-router-dom';
import { useTransitionNavigate } from '@/context/TransitionContext';

type Props = Omit<LinkProps, 'to'> & { to: string };

/**
 * A router link that plays the page-transition animation.
 * Modified clicks (new tab, etc.) behave like a normal link.
 */
export function TransitionLink({ to, state, onClick, ...rest }: Props) {
  const go = useTransitionNavigate();

  return (
    <Link
      to={to}
      state={state}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        go(to, state);
      }}
      {...rest}
    />
  );
}
