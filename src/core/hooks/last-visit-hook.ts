// import React from 'react';
import { SafeLocalStorage } from '../utils/local-storage';
// Modify to user is login
export const useLastVisit = (collection: string, isAuthenticated: boolean) => {
  const storage = new SafeLocalStorage();
  if (!isAuthenticated) {
    if (!storage.getItem(collection)) {
      const timeSpan = new Date().getTime().toString();
      console.log('timeSpan', timeSpan);
      storage.setItem(collection, timeSpan);
      return timeSpan;
    } else {
      return storage.getItem(collection) || new Date().getTime().toString();
    }
  } else {
    return new Date().getTime().toString();
  }
};
