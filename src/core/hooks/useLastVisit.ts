import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { SafeLocalStorage } from '../utils/local-storage';
import { DateTime } from 'luxon';
import request from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import { useCookiesContextTracking } from '../context/CookiesContext';
import { USER_ACTIVITY_QUERY, USER_ACTIVITY_UPDATE_MUTATION } from './useLastVist.api';

export type LastVisitResult = {
  lastVisit: number;
  forceVisit: () => void;
};

const EPSILON = 5000; // 5 second

export const useLastVisit = (collection: string, shouldUpdate = true): LastVisitResult => {
  const { permissionManager, authToken } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const [activityHistory, setActivityHistory] = useState<{ [key: string]: number[] }>({
    [collection]: [DateTime.now().toMillis()],
  });

  const lastVisit = useMemo(() => {
    // several renders using the same collection could set as lastVisit the current time
    // over the actual last visit time, to prevent that all visits are recorded but
    // only the newest but older than EPSILON milliseconds is taken in consideration
    // except when the data is coming from the API, in that case, the last value will be
    // the most accurate
    const collectionLastVisit = activityHistory[collection] || [DateTime.now().toMillis()];
    if (permissionManager.isAuthenticated()) {
      // last result is coming from the API or now() (the most accurate)
      return collectionLastVisit[collectionLastVisit.length - 1];
    }
    let actualLastVisit = collectionLastVisit[collectionLastVisit.length - 1];
    let index = collectionLastVisit.length - 2;
    while (index >= 0) {
      if (actualLastVisit - collectionLastVisit[index] > EPSILON) {
        actualLastVisit = collectionLastVisit[index];
        break;
      }
      index--;
    }

    return actualLastVisit;
  }, [collection, activityHistory, permissionManager]);

  const forceVisit = useCallback(async () => {
    if (!isTimestampTrackingAccepted) {
      // timestamp tracking no accepted by the user privacy
      return;
    }
    if (permissionManager.isAuthenticated()) {
      // API strategy
      if (shouldUpdate) {
        // only mutation should be done
        const { query, input } = USER_ACTIVITY_UPDATE_MUTATION(collection, permissionManager.loggedUser?.id || '');
        const result = await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });

        if (result?.userActivityUpdate[0]?.previous?.timestamp) {
          setActivityHistory({
            ...activityHistory,
            [collection]: [
              ...(activityHistory[collection] || []),
              DateTime.fromISO(result.userActivityUpdate[0].previous.timestamp).toMillis(),
            ],
          });
        }
      } else {
        // only the query should be done
        const { query, filter } = USER_ACTIVITY_QUERY(collection, permissionManager.loggedUser?.id || '');
        const result = await request(GRAPHQL_ENDPOINT, query, filter, { Authorization: `Bearer ${authToken}` });
        const userActivity = result.userActivity;
        if (Array.isArray(userActivity) && userActivity.length > 0) {
          setActivityHistory({
            ...activityHistory,
            [collection]: [
              ...(activityHistory[collection] || []),
              DateTime.fromISO(userActivity[userActivity.length - 1].lastVisit).toMillis(),
            ],
          });
        } else {
          // there're not activity record in the DB
          setActivityHistory({
            ...activityHistory,
            [collection]: [...(activityHistory[collection] || []), DateTime.now().toMillis()],
          });
        }
      }
    } else {
      // local storage strategy
      const storage = new SafeLocalStorage();
      const storageValue = storage.getItem(collection);
      if (storageValue && !isNaN(parseInt(storageValue))) {
        setActivityHistory({
          ...activityHistory,
          [collection]: [...(activityHistory[collection] || []), Number(storageValue)],
        });
      }

      // update local storage value
      if (shouldUpdate) {
        storage.setItem(collection, DateTime.now().toMillis().toString());
      }
    }
  }, [permissionManager, setActivityHistory, activityHistory, collection, shouldUpdate, isTimestampTrackingAccepted]);

  useEffect(() => {
    forceVisit();
  }, [collection, permissionManager, isTimestampTrackingAccepted]);

  return {
    lastVisit,
    forceVisit,
  };
};
