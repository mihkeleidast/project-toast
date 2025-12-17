import React from 'react';

export function useEscapeKey(callback) {
    React.useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === 'Escape') {
            callback();
          }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown)
        }

      }, [callback]);
}