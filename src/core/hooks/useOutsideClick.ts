import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

// The hook is too generic to use anything else
// eslint-disable-next-line
const useOutsideClick = (ref: MutableRefObject<any>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
