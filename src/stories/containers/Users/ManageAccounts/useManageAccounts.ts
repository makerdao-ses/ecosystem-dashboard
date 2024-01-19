import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import lightTheme from '../../../../../styles/theme/light';
import { fetcher } from '../../../../core/utils/fetcher';
import { QUERY_USERS } from '../UsersManager/userManagerAPI';
import type { UserDTO } from '../../../../core/models/dto/authDTO';
import type { Fetcher } from 'swr';

const useManageAccounts = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  const { data, error } = useSWR<{ users: UserDTO[] }, string>(QUERY_USERS, fetcher as Fetcher<{ users: UserDTO[] }>);
  const users: UserDTO[] = useMemo(() => data?.users || [], [data?.users]);

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
    router.push(`/auth/manage/user/${userTake?.username}/delete-account`);
  };
  const handleGoProfileView = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userTake = users?.find((user: any) => user.id === id);
    router.push(`/auth/manage/user/${userTake?.username}`);
  };

  const filteredData = useMemo(() => {
    if (!searchValue) return users;
    const result = users.filter(
      (user) => user.username.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1
    );
    return result;
  }, [searchValue, users]);

  return {
    isMobile,
    searchValue,
    filteredData,
    loading: !data && !error,
    handleClearSearch,
    handleChangeValue,
    handleCreateNewAccount,
    handleDeleteAccount,
    handleGoProfileView,
  };
};

export default useManageAccounts;
