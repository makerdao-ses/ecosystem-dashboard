import React, { useState, useMemo, useCallback, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { useCookiesContextTracking } from './CookiesContext';
import { DateTime } from 'luxon';
import { SafeLocalStorage } from '../utils/local-storage';
import { USER_ACTIVITY_QUERY, USER_ACTIVITY_UPDATE_MUTATION } from '../hooks/useLastVisit.api';
import request from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';

const EPSILON = 5000; // 5 second

export type LastVisitContextValues = {
  lastVisit: { [collection: string]: number };
  visitCollection: (collection: string, updateLastVisit: boolean, forceLastValue?: boolean) => Promise<void>;
};

export const LastVisitContext = React.createContext<LastVisitContextValues>({
  lastVisit: {},
  visitCollection: (collection: string, updateLastVisit: boolean) => {
    throw new Error(`(${collection}/${updateLastVisit}): No implemented yet`);
  },
});

export const useLastVisitContext = () => useContext(LastVisitContext);

export const LastVisitContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { permissionManager, authToken } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const [activityHistory, setActivityHistory] = useState<{ [collection: string]: number[] }>({});

  const lastVisit: { [collection: string]: number } = useMemo(() => {
    // several renders using the same collection could set as lastVisit the current time
    // over the actual last visit time, to prevent that all visits are recorded but
    // only the newest but older than EPSILON milliseconds is taken in consideration
    // except when the data is coming from the API, in that case, the last value will be
    // the most accurate
    const visits: { [collection: string]: number } = {};
    for (const collection in activityHistory) {
      const collectionLastVisit = activityHistory[collection] || [DateTime.now().toMillis()];
      if (permissionManager.isAuthenticated()) {
        // last result is coming from the API or now() (the most accurate)
        visits[collection] = collectionLastVisit[collectionLastVisit.length - 1];
        continue;
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

      visits[collection] = actualLastVisit;
    }

    return visits;
  }, [activityHistory, permissionManager]);

  const visitCollection = useCallback(
    async (collection: string, updateLastVisit: boolean, forceLastValue = false) => {
      if (!isTimestampTrackingAccepted) {
        // timestamp tracking no accepted by the user privacy
        return;
      }
      if (permissionManager.isAuthenticated()) {
        // API strategy
        if (updateLastVisit) {
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
            [collection]: [...(forceLastValue ? [] : activityHistory[collection] || []), Number(storageValue)],
          });
        }

        // update local storage value
        if (updateLastVisit) {
          storage.setItem(collection, DateTime.now().toMillis().toString());
        }
      }
    },
    [permissionManager, setActivityHistory, activityHistory, isTimestampTrackingAccepted]
  );

  return (
    <LastVisitContext.Provider
      value={{
        lastVisit,
        visitCollection,
      }}
    >
      {children}
    </LastVisitContext.Provider>
  );
};
