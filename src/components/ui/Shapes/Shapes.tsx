import type { Shape } from '@/types';
import { cx } from '@/utils/cx';
import { STAR_PATH } from '@/components/ui/Icons/Icons';
import './Shapes.css';

interface ShapesProps {
  list: Shape[];
}

/**
 * Renders flat-colour artwork. The parent must be a positioned container with
 * `container-type: inline-size` so the `cqw` units resolve (see .art, .deco, .ico).
 */
export function Shapes({ list }: ShapesProps) {
  return (
    <>
      {list.map((shape, index) => {
        if (shape.kind === 'star') {
          return (
            <svg
              key={index}
              className={cx('shape', shape.className)}
              viewBox="0 0 40 40"
              aria-hidden="true"
              style={{
                left: `${shape.x}cqw`,
                top: `${shape.y}cqw`,
                width: `${shape.size}cqw`,
                height: `${shape.size}cqw`,
                color: `var(--${shape.color})`,
              }}
            >
              <path fill="currentColor" d={STAR_PATH} />
            </svg>
          );
        }
        return (
          <i
            key={index}
            className={cx('shape', shape.className)}
            style={{
              left: `${shape.x}cqw`,
              top: `${shape.y}cqw`,
              width: `${shape.w}cqw`,
              height: `${shape.h}cqw`,
              background: shape.color === 'none' ? 'transparent' : `var(--${shape.color})`,
              borderRadius: shape.radius ?? 0,
              ...shape.style,
            }}
          />
        );
      })}
    </>
  );
}
