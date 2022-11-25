import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import lightTheme from '../../../../../styles/theme/light';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { QUERY_USERS } from '../users-manager/user-manager.api';

const useManageAccountsViewModel = () => {
  const router = useRouter();
  const { clientRequest } = useAuthContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));

  const fetcher = async (query: string) => await clientRequest?.request(query);
  const { data } = useSWR(QUERY_USERS, fetcher);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: any[] = useMemo(() => data?.users || [], [data?.users]);

  const [searchValue, setSearchValue] = useState('');
  const handleClearSearch = () => {
    setSearchValue('');
  };
  const handleChangeValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleCreateNewAccount = () => {
    router.push('/auth/create-account');
  };
  const handleDeleteAccount = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userTake = users?.find((user: any) => user.id === id);
    router.push({
      pathname: '/auth/delete-account/',
      query: {
        userName: userTake.username,
        id,
      },
    });
  };
  const handleGoProfileView = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userTake = users?.find((user: any) => user.id === id);
    router.push({
      pathname: '/auth/enable-disable-accounts/',
      query: {
        userName: userTake.username,
        id,
      },
    });
  };

  const filteredData = useMemo(() => {
    if (!searchValue) return users;
    const result = users.filter((user) => {
      return user.username.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1;
    });
    return result;
  }, [searchValue, users]);

  return {
    isMobile,
    searchValue,
    filteredData,
    handleClearSearch,
    handleChangeValue,
    handleCreateNewAccount,
    handleDeleteAccount,
    handleGoProfileView,
  };
};

export default useManageAccountsViewModel;
