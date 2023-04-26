import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import { SafeLocalStorage } from './localStorage';
import type PermissionManager from '../auth/permissionManager';
import type {
  LocalStoredUserActivity,
  UserActivityDto,
  UserActivityUpdateInput,
  UserActivityUpdatePayload,
} from '../models/dto/userActivityDto';

export const USER_ACTIVITY_UPDATE_MUTATION = (input: UserActivityUpdateInput) => ({
  query: gql`
    mutation UserActivityUpdate($input: UserActivityUpdateInput) {
      userActivityUpdate(input: $input) {
        id
        collection
        userId
        current {
          data
          timestamp
        }
        previous {
          data
          timestamp
        }
      }
    }
  `,
  input: {
    input,
  },
});

export const USER_ACTIVITY_QUERY = (collection: string, userId: string) => ({
  query: gql`
    query ($filter: UserActivityFilter) {
      userActivity(filter: $filter) {
        id
        collection
        data
        lastVisit
        userId
      }
    }
  `,
  filter: {
    filter: {
      collection,
      userId,
    },
  },
});

class UserActivityManager {
  private readonly _permissionManager: PermissionManager;
  private _storage: Storage;

  constructor(permissionManager: PermissionManager) {
    this._permissionManager = permissionManager;
    this._storage = new SafeLocalStorage();
  }

  public async create(input: UserActivityUpdateInput): Promise<UserActivityUpdatePayload> {
    if (this._permissionManager.isAuthenticated()) {
      // create using API mutation
      const { query, input: params } = USER_ACTIVITY_UPDATE_MUTATION(input);
      const result = await request<{ userActivityUpdate: UserActivityUpdatePayload[] }>(
        GRAPHQL_ENDPOINT,
        query,
        params,
        {
          Authorization: `Bearer ${this._permissionManager.token}`,
        }
      );

      return result.userActivityUpdate[0];
    } else {
      // create using local storage
      const key = input.collection;
      const value = input.data
        ? JSON.stringify({
            data: input.data,
            timestamp: input.timestamp,
          })
        : input.timestamp;

      let previousValue;
      try {
        previousValue = JSON.parse(this._storage.getItem(key) ?? '{}');
      } catch {}

      this._storage.setItem(key, value?.toString() ?? '');
      return {
        id: input.collection,
        userId: '',
        collection: input.collection,
        current: {
          data: typeof input.data === 'string' ? JSON.parse(input.data) : input.data ?? null,
          timestamp: input.timestamp?.toString() ?? '',
        },
        previous: {
          data: typeof previousValue === 'object' ? previousValue.data : null,
          timestamp: typeof previousValue === 'object' ? previousValue.timestamp : previousValue,
        },
      };
    }
  }

  public async getLastActivity(collection: string): Promise<UserActivityDto | undefined> {
    if (this._permissionManager.isAuthenticated()) {
      // get activity from the API
      const { query, filter } = USER_ACTIVITY_QUERY(collection, this._permissionManager.loggedUser?.id || '');
      const result = await request<{ userActivity: UserActivityDto[] }>(GRAPHQL_ENDPOINT, query, filter, {
        Authorization: `Bearer ${this._permissionManager.token}`,
      });

      return result.userActivity[0];
    } else {
      // get activity from the local storage
      const storedValue = this._storage.getItem(collection);
      const activity = {
        id: collection,
        userId: '',
        collection,
        data: null,
        lastVisit: '',
      };
      try {
        const parsedValue = JSON.parse(storedValue ?? '{}') as LocalStoredUserActivity;
        activity.data =
          typeof parsedValue?.data === 'string' ? JSON.parse(parsedValue?.data) : parsedValue?.data ?? null;
        activity.lastVisit = parsedValue?.timestamp ?? '';
      } catch {
        activity.lastVisit = storedValue ?? '';
      }
      return activity;
    }
  }
}

export default UserActivityManager;
