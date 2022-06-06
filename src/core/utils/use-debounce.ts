import { useState } from 'react';

export const useDebounce = () => {
  const [tempTimeout, setTempTimeout] = useState<NodeJS.Timeout>();

  return (callback: () => void, milliseconds: number) => {
    tempTimeout && clearTimeout(tempTimeout);
    setTempTimeout(setTimeout(callback, milliseconds));
  };
};
