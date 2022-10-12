import { ActivityFeedDto } from '../models/dto/core-unit.dto';
import { SafeLocalStorage } from './local-storage';

export class ActivityVisitHandler {
  private static STORAGE_KEY_SUFFIX = 'activity-visit-';
  private _storageKey: string;
  private _storage: Storage;
  private _activityCookie: boolean;
  constructor(cuId?: string, saveStorage?: boolean) {
    this._storageKey = `${ActivityVisitHandler.STORAGE_KEY_SUFFIX}${cuId ?? 'global'}`;
    this._storage = new SafeLocalStorage();
    this._activityCookie = saveStorage ?? false;
  }

  public visit(): void {
    if (this._activityCookie) this._storage.setItem(this._storageKey, new Date().getTime().toString());
  }

  public lastVisit(): Date | undefined {
    const storedVisit = this._storage.getItem(this._storageKey);

    if (!storedVisit) return;

    return new Date(parseInt(storedVisit));
  }

  public wasVisited(activity: ActivityFeedDto): boolean {
    const _lastVisit = this.lastVisit();

    return _lastVisit ? _lastVisit < new Date(activity.created_at) : false;
  }
}
