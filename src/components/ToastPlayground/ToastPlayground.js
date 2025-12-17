import React from 'react';

import Button from '../Button';

import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const [toasts, setToasts] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);

  function handleSubmit(e) {
    e.preventDefault();

    if (message && variant) {
      setToasts((currentToasts) => setToasts([...currentToasts, {
        id: crypto.randomUUID(),
        variant,
        message,
      }]))
      setMessage('');
      setVariant(DEFAULT_VARIANT)
    }
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} onDismiss={handleDismiss} />

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label htmlFor={id} key={option}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={() => setVariant(option)}
                    required
                  />
                  {option}
                </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
