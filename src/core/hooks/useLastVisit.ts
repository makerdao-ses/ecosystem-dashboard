import { useState, useEffect } from 'react';
import { useLastVisitContext } from '../context/LastVisitContext';
import { useAuthContext } from '../context/AuthContext';
import { useCookiesContextTracking } from '../context/CookiesContext';

export const useLastVisit = (collection: string, shouldUpdate = true): number | undefined => {
  const { lastVisit, visitCollection } = useLastVisitContext();
  const [collectionLastVisit, setCollectionLastVisit] = useState<number | undefined>(lastVisit[collection]);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  useEffect(() => {
    setCollectionLastVisit(lastVisit[collection]);
  }, [lastVisit, setCollectionLastVisit]);

  useEffect(() => {
    visitCollection(collection, shouldUpdate);
  }, [collection, shouldUpdate, permissionManager, isTimestampTrackingAccepted]);

  return collectionLastVisit;
};
