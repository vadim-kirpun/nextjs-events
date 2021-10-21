import type { KeyboardEvent } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const getEnterHandler =
  (handler: Function) => (event: KeyboardEvent) => {
    if (event.key === 'Enter') handler();
  };
