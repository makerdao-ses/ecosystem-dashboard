export const withLocalStorageItem =
  (key: string, value: string): (() => Promise<object>) =>
  async () => {
    window.localStorage.setItem(key, value);
    return {};
  };
