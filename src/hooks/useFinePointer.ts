import { useMediaQuery } from './useMediaQuery';

/** True for devices with a mouse-like pointer (used for the cursor and tilt effects). */
export const useFinePointer = (): boolean => useMediaQuery('(hover: hover) and (pointer: fine)');
