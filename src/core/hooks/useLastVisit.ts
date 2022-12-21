import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { SafeLocalStorage } from '../utils/local-storage';
import { DateTime } from 'luxon';

// const USER_ACTIVITY_UPDATE_MUTATION =
// ```
// mutation UserActivityUpdate($input: UserActivityUpdateInput) {
//     userActivityUpdate(input: $input) {
//       collection
//       current {
//         timestamp
//       }
//       previous {
//         timestamp
//       }
//     }
//   }
// ```
export const useLastVisit = (collection: string): number => {
  const { permissionManager } = useAuthContext();
  const [lastVisit, setLastVisit] = useState<number>(DateTime.now().toMillis());

  useEffect(() => {
    if (permissionManager.isAuthenticated()) {
      // API strategy
      // TODO
    } else {
      // local storage strategy
      const storage = new SafeLocalStorage();
      const storageValue = storage.getItem(collection);
      if (storageValue && Number.isSafeInteger(storageValue)) {
        setLastVisit(Number(storageValue));
      }

      // update local storage value
      storage.setItem(collection, DateTime.now().toMillis().toString());
    }
  }, [collection]);

  return lastVisit;
};
