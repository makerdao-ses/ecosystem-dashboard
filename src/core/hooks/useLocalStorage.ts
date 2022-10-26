import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function useLocalStorage(key: string, initialValue: string, theme?: boolean) {
  const readStorage = useCallback((key: string) => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? parseJSON(item) : undefined;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return undefined;
    }
  }, []);

  const [state, setState] = useState(initialValue);
  // Persists the new value to localStorage.
  const setStorage = useCallback(
    (value: string) => {
      console.log('theme', theme);

      if (!theme) return;
      if (typeof window === 'undefined') {
        // console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(value));

        window.dispatchEvent(new Event('local-storage'));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, theme]
  );

  useEffect(() => {
    const theme = readStorage('themeMode') as string;
    const val = theme || initialValue;
    setState(val);
    setStorage(val);
  }, [initialValue, readStorage, setStorage]);

  const handleStorageChange = (val: string) => {
    setState(val);
    setStorage(val);
  };

  return {
    state,
    handleStorageChange,
  };
}

export default useLocalStorage;

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    console.log('parsing error on', { value });
    return undefined;
  }
}
