import { useEffect, useRef, useState } from 'react';

/** Header behaviour: solid background after scrolling, hides when scrolling down, returns on scroll up. */
export function useNavVisibility(): { solid: boolean; hidden: boolean } {
  const [state, setState] = useState({ solid: false, hidden: false });
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      const jumped = Math.abs(dy) > 250; // e.g. scroll restored after the menu closes: not a swipe
      setState((prev) => {
        const solid = y > 60;
        let hidden = prev.hidden;
        if (jumped) hidden = false;
        else if (dy > 5 && y > 320) hidden = true;
        else if (dy < -4 || y < 320) hidden = false;
        return prev.solid === solid && prev.hidden === hidden ? prev : { solid, hidden };
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
