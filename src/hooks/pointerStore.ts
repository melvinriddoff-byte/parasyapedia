/** One shared pointer position (-1 to 1 from the centre of the screen) for all motion effects. */
const pointer = { x: 0, y: 0 };
let listening = false;

export function getPointer(): { x: number; y: number } {
  if (!listening && typeof window !== 'undefined') {
    listening = true;
    window.addEventListener(
      'pointermove',
      (event) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true },
    );
    document.documentElement.addEventListener('pointerleave', () => {
      pointer.x = 0;
      pointer.y = 0;
    });
  }
  return pointer;
}
