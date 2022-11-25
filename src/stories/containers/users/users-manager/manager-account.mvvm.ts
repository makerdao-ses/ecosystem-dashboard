import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { TableItems } from '../../transparency-report/transparency-report';
import { QUERY_USERS } from './user-manager.api';

export const MANAGE_IDS = ['profile', 'manage'];

export const useManagerAccountViewModel = () => {
  const router = useRouter();
  const { authToken } = useAuthContext();
  const query = router.query;
  const code = query.code as string;

  const fetcher = (query: string) => request(GRAPHQL_ENDPOINT, query, null, { Authorization: `Bearer ${authToken}` });
  const { data, error } = useSWR(QUERY_USERS, fetcher);
  const users: UserDTO[] = useMemo(() => data?.users || [], [data?.users]);

  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);

  const [tabsIndex, setTabsIndex] = useState(1);

  useEffect(() => {
    if (anchor) {
      const index = MANAGE_IDS.findIndex((id) => anchor.indexOf(id) > -1);
      setTabsIndex(index);
    }
  }, [anchor]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (anchor === '') {
      setScrolled(true);
    }
    if (!scrolled && anchor && MANAGE_IDS.includes(anchor)) {
      setScrolled(true);
      let offset = (transparencyTableRef?.current?.offsetTop || 0) - 280;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 100;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor]);

  const tabItems: TableItems[] = [
    {
      item: 'Your Profile',
      id: MANAGE_IDS[0],
    },
  ];

  return {
    tabItems,
    tabsIndex,
    code,
    transparencyTableRef,
    data,
    error,
    users,
  };
};
