/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import lightTheme from '../../../../../styles/theme/light';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import { capitalizeWord } from '../../../../core/utils/string.utils';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { SearchInput } from '../../../components/search-input/search-input';
import { Tabs } from '../../../components/tabs/tabs';
import UserCard from '../../../components/user-card/user-card';
import UserProfile from '../user-profile/user-profile';
import { useManagerAccountViewModel } from './manager-account.mvvm';
import { QUERY_USERS } from './user-manager.api';

export default () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { isLight } = useThemeContext();
  const { clientRequest } = useAuthContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const { tabsIndex } = useManagerAccountViewModel();

  const fetcher = async (query: string) => await clientRequest?.request(query);
  const { data, error } = useSWR(QUERY_USERS, fetcher);
  const users: any[] = useMemo(() => data?.users || [], [data?.users]);

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

  const handleCreateNewAccount = () => {
    router.push('/auth/create-account');
  };

  const handleChangeValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleGoProfileView = (id: string) => {
    const userTake = users?.find((user: any) => user.id === id);
    router.push({
      pathname: '/auth/enable-disable-accounts/',
      query: {
        userName: userTake.username,
        id,
      },
    });
  };

  const filterData = useMemo(() => {
    if (!searchValue) return users;
    const result = users.filter((user) => {
      console.log('user', user.username);
      return user.username.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1;
    });
    return result;
  }, [searchValue, users]);

  if (!data && !error) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
        }}
      >
        Loading......
      </div>
    );
  }
  return (
    <MainWrapper isLight={isLight}>
      <Container>
        <Tabs
          currentIndex={tabsIndex}
          items={[
            {
              item: 'Your Profile',
              id: 'profile',
            },
            {
              item: 'Manage Accounts',
              id: 'manage',
            },
          ]}
          style={{
            margin: '32px 0',
          }}
        />
      </Container>
      {tabsIndex === 0 && (
        <ContainerProfile>
          <UserProfile />
        </ContainerProfile>
      )}
      {tabsIndex === 1 && (
        <>
          <ContainerHeaderTitle>
            <Title isLight={isLight}>Manage Accounts</Title>
            <ContainerHeader>
              <Search>
                <SearchInput
                  value={searchValue}
                  handleClearSearch={handleClearSearch}
                  placeholder="Search"
                  onChange={handleChangeValue}
                />
              </Search>
              <Line isLight={isLight} />
              <ButtonArea>
                <CustomButton
                  onClick={handleCreateNewAccount}
                  label={isMobile ? 'New User' : 'Create New Account'}
                  withIcon
                  buttonType={ButtonType.Primary}
                  style={{
                    height: isMobile ? 34 : 48,
                  }}
                  padding={isMobile ? '8px 16px' : '14.5px 24px'}
                  styleText={{
                    fontSize: isMobile ? 14 : 16,
                    lineHeight: isMobile ? '18px' : '19px',
                  }}
                />
              </ButtonArea>
            </ContainerHeader>
          </ContainerHeaderTitle>
          <ContainerCards>
            {filterData.map((user: any) => {
              return (
                <UserCard
                  checked={user.active}
                  handleDeleteAccount={handleDeleteAccount}
                  role={user.roles[0].name}
                  user={capitalizeWord(user?.username) || ''}
                  key={user.id}
                  id={user.id}
                  handleGoProfileView={handleGoProfileView}
                />
              );
            })}
          </ContainerCards>
        </>
      )}
    </MainWrapper>
  );
};

const MainWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  marginTop: 64,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 24,
  marginBottom: 24,
  '@media (min-width: 375px)': {
    width: 343,
    margin: '0 auto',
    marginBottom: 24,
    justifyContent: 'center',
  },
  '@media (min-width: 834px)': {
    justifyContent: 'flex-start',
    width: 770,
  },
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-start',
    width: 1130,
  },
  '@media (min-width: 1280px)': {
    justifyContent: 'flex-start',
    width: 1184,
  },
  '@media (min-width: 1440px)': {
    width: 1312,
    marginBottom: 40,
  },
  '@media (min-width: 1920px)': {
    width: 1312,
  },
});

export const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 64,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
}));

const ContainerHeaderTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '@media (min-width: 375px)': {
    justifyContent: 'center',
  },
  '@media (min-width: 834px)': {
    justifyContent: 'flex-end',
    width: 770,
    margin: '0 auto',
  },
  '@media (min-width: 1194px)': {
    justifyContent: 'space-between',
    width: 1130,
    margin: '0 auto',
  },
  '@media (min-width: 1280px)': {
    justifyContent: 'space-between',
    width: 1184,
    margin: '0 auto',
  },
  '@media (min-width: 1440px)': {
    justifyContent: 'space-between',
    width: 1312,
    margin: '0 auto',
  },
});

const ContainerHeader = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto',
  gridTemplateColumns: 'auto',
  gridTemplateAreas: `"searchArea"
     "lineArea"
     "buttonArea"
     `,
  '@media (min-width: 375px)': {
    justifyContent: 'center',
    gridTemplateAreas: '"searchArea buttonArea"',
    columnGap: 16,
  },
  '@media (min-width: 834px)': {
    gridTemplateAreas: '"searchArea lineArea buttonArea"',
    columnGap: 24,
    alignItems: 'center',
  },
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridTemplateAreas: '"titleArea spaceArea searchArea lineArea buttonArea"',
  },
});

const Title = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'none',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  '@media (min-width: 1194px)': {
    display: 'flex',
  },
}));
const Search = styled.div({
  gridArea: 'searchArea',
  width: 205,
  height: 34,
  '@media (min-width: 834px)': {
    width: 320,
    height: 48,
  },
});
const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  gridArea: 'lineArea',
  height: 32,
  width: 1,
  columnGap: 4,
  display: 'none',
  background: isLight ? '#D4D9E1' : '#405361',
  '@media (min-width: 834px)': {
    paddingTop: 4,
    paddingBottom: 4,
    display: 'flex',
  },
}));

const ButtonArea = styled.div({
  gridArea: 'buttonArea',
  width: 122,
  height: 34,
  '@media (min-width: 834px)': {
    width: 231,
    height: 48,
  },
});

const ContainerCards = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto',
  gridTemplateColumns: 'auto',
  justifyContent: 'center',
  rowGap: 32,
  marginTop: 24,
  '@media (min-width: 834px)': {
    justifyContent: 'space-between',
    width: 770,
    margin: '0 auto',
    marginTop: 24,
    gridTemplateColumns: 'repeat(auto-fill, 369px)',
  },
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-center',
    width: 1130,
    margin: '0 auto',
    marginTop: 24,
    gridTemplateColumns: 'repeat(auto-fill, 355.33px)',
  },
  '@media (min-width: 1280px)': {
    justifyContent: 'flex-center',
    width: 1184,
    margin: '0 auto',
    marginTop: 24,
    gridTemplateColumns: 'repeat(auto-fill, 373.33px)',
  },
  '@media (min-width: 1440px)': {
    justifyContent: 'flex-center',
    width: 1312,
    margin: '0 auto',
    marginTop: 32,
    gridTemplateColumns: 'repeat(auto-fill, 416px)',
  },
});

const ContainerProfile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});
