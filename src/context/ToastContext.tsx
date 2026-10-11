import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast } from '@/components/layout/Toast/Toast';

type ShowToast = (message: string) => void;

const ToastContext = createContext<ShowToast>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();

  const show = useCallback<ShowToast>((text) => {
    setMessage(text);
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <Toast message={message} visible={visible} />
    </ToastContext.Provider>
  );
}

export const useToast = (): ShowToast => useContext(ToastContext);
