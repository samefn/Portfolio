import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, video, [tabindex]:not([tabindex="-1"])';

export default function useDialog(open, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const lastFocused = document.activeElement;
    document.body.classList.add('modal-lock');
    const t = setTimeout(() => dialogRef.current?.querySelector('.modal-close')?.focus(), 30);

    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-lock');
      lastFocused?.focus?.();
    };
  }, [open]);

  return dialogRef;
}
