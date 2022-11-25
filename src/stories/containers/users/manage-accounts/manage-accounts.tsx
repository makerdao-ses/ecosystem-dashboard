import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { SearchInput } from '../../../components/search-input/search-input';
import UserCard from '../../../components/user-card/user-card';
import useManageAccountsViewModel from './manage-accounts.mvvm';

const ManageAccounts = () => {
  const { isLight } = useThemeContext();
  const {
    isMobile,
    searchValue,
    filteredData,
    handleClearSearch,
    handleChangeValue,
    handleCreateNewAccount,
    handleDeleteAccount,
    handleGoProfileView,
  } = useManageAccountsViewModel();

  return (
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
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredData?.map((user: any) => {
            return (
              <UserCard
                checked={user.active}
                user={user}
                handleDeleteAccount={handleDeleteAccount}
                key={user.id}
                id={user.id}
                handleGoProfileView={handleGoProfileView}
              />
            );
          })
        }
      </ContainerCards>
    </>
  );
};

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

export default ManageAccounts;
