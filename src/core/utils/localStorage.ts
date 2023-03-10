export class SafeLocalStorage implements Storage {
  private _localStorage?: Storage;
  constructor() {
    this._localStorage = typeof localStorage === 'undefined' ? undefined : localStorage;
  }

  private get isLocalStorageEnabled(): boolean {
    return !!this._localStorage;
  }

  get length(): number {
    if (!this.isLocalStorageEnabled) {
      return 0;
    }

    return this._localStorage?.length || 0;
  }

  clear(): void {
    if (!this.isLocalStorageEnabled) {
      return;
    }

    this._localStorage?.clear();
  }

  getItem(key: string): string | null {
    if (!this.isLocalStorageEnabled) {
      return null;
    }

    return this._localStorage?.getItem(key) || null;
  }

  key(index: number): string | null {
    if (!this.isLocalStorageEnabled) {
      return null;
    }

    return this._localStorage?.key(index) || null;
  }

  removeItem(key: string): void {
    if (!this.isLocalStorageEnabled) {
      return;
    }

    this._localStorage?.removeItem(key);
  }

  setItem(key: string, value: string): void {
    if (!this.isLocalStorageEnabled) {
      return;
    }

    this._localStorage?.setItem(key, value);
  }
}
