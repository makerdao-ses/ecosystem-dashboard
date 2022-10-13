import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useEventListener from './useEventListener';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [cookies] = useCookies(['darkMode']);
  const readStorage = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // Persists the new value to localStorage.
  const setStorage: SetValue<T> = (value) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }
    try {
      const newValue = value instanceof Function ? value(state) : value;
      if (cookies.darkMode === 'true') window.localStorage.setItem(key, JSON.stringify(newValue));

      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const [state, setState] = useState<T>(initialValue);
  useEffect(() => {
    setState(readStorage());
  }, []);

  useEffect(() => {
    setStorage(state);
  }, [state]);

  const handleStorageChange = () => {
    setState(readStorage());
  };

  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);
  return [state, setState];
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
