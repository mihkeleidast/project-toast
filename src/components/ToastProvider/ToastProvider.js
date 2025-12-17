import React from 'react';

export const ToastContext = React.createContext();

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

  const ctxValue = React.useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast])
  return <ToastContext.Provider value={ctxValue}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
