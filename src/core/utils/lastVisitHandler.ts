import request from 'graphql-request';
import { DateTime } from 'luxon';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import { USER_ACTIVITY_QUERY, USER_ACTIVITY_UPDATE_MUTATION } from '../hooks/useLastVisit.api';
import { SafeLocalStorage } from './localStorage';
import type PermissionManager from '../auth/permissionManager';

export class LastVisitHandler {
  private _storage: Storage;
  private readonly _collectionKey: string;
  private readonly _permissionManager: PermissionManager;
  private _lastVisit?: DateTime;

  constructor(collectionKey: string, permissionManager: PermissionManager) {
    this._collectionKey = collectionKey;
    this._permissionManager = permissionManager;
    this._storage = new SafeLocalStorage();
  }

  public async visit(): Promise<number | undefined> {
    if (this._permissionManager.isAuthenticated()) {
      // update using API mutation
      const { query, input } = USER_ACTIVITY_UPDATE_MUTATION(
        this._collectionKey,
        this._permissionManager.loggedUser?.id || ''
      );
      const result = await request(GRAPHQL_ENDPOINT, query, input, {
        Authorization: `Bearer ${this._permissionManager.token}`,
      });
      return DateTime.fromISO(result?.userActivityUpdate[0]?.current?.timestamp).toMillis();
    } else {
      // update using local storage
      const timestamp = DateTime.now().toMillis();
      this._storage.setItem(this._collectionKey, timestamp.toString());
      return timestamp;
    }
  }

  public async lastVisit(): Promise<DateTime | undefined> {
    if (this._permissionManager.isAuthenticated()) {
      // API strategy
      const { query, filter } = USER_ACTIVITY_QUERY(this._collectionKey, this._permissionManager.loggedUser?.id || '');
      const result = await request(GRAPHQL_ENDPOINT, query, filter, {
        Authorization: `Bearer ${this._permissionManager.token}`,
      });
      const userActivity = result.userActivity;
      if (Array.isArray(userActivity) && userActivity.length > 0) {
        this._lastVisit = DateTime.fromISO(userActivity[userActivity.length - 1].lastVisit);
        return this._lastVisit;
      }
    } else {
      // local storage strategy
      const storageValue = this._storage.getItem(this._collectionKey);
      if (storageValue && !isNaN(parseInt(storageValue))) {
        this._lastVisit = DateTime.fromMillis(Number(storageValue));
        return this._lastVisit;
      }
    }
  }

  public wasVisited(timestamp: DateTime | number): boolean {
    if (typeof timestamp !== 'number') {
      timestamp = timestamp.toMillis();
    }

    return this._lastVisit ? this._lastVisit.toMillis() < timestamp : false;
  }
}
