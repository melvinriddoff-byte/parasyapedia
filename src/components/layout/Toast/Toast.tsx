import { cx } from '@/utils/cx';
import './Toast.css';

interface ToastProps {
  message: string;
  visible: boolean;
}

/** Small message pill at the bottom of the screen. Use through useToast(). */
export function Toast({ message, visible }: ToastProps) {
  return (
    <div className={cx('toast', visible && 'show')} role="status">
      {message}
    </div>
  );
}
