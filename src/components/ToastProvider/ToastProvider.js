import React from 'react';

export const ToastContext = React.createContext({});

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(function addToast({ variant, message }) {
    setToasts((currentToasts) => [...currentToasts, {
      id: crypto.randomUUID(),
      variant,
      message,
    }])
  }, []);

  const removeToast = React.useCallback(function removeToast(id) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

  }, []);

  const ctxValue = React.useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast])
  return <ToastContext.Provider value={ctxValue}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
