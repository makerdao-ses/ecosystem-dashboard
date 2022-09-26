import { CuActivityDto } from '../models/dto/core-unit-activity.dto';
import { SafeLocalStorage } from './local-storage';

export class ActivityVisitHandler {
  private static STORAGE_KEY_SUFFIX = 'activity-visit-';
  private _storageKey: string;
  private _storage: Storage;

  constructor(cuId?: string) {
    this._storageKey = `${ActivityVisitHandler.STORAGE_KEY_SUFFIX}${cuId ?? 'global'}`;
    this._storage = new SafeLocalStorage();
  }

  public visit(): void {
    this._storage.setItem(this._storageKey, new Date().getTime().toString());
  }

  public lastVisit(): Date | undefined {
    const storedVisit = this._storage.getItem(this._storageKey);

    if (!storedVisit) return;

    return new Date(parseInt(storedVisit));
  }

  public wasVisited(activity: CuActivityDto): boolean {
    const _lastVisit = this.lastVisit();

    return _lastVisit ? _lastVisit < new Date(parseInt(activity.updateDate || '0')) : false;
  }
}
