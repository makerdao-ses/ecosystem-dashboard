/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import lightTheme from '../../../../../styles/theme/light';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import { RoleEnum } from '../../../../core/enums/role.enum';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { SearchInput } from '../../../components/search-input/search-input';
import { Tabs } from '../../../components/tabs/tabs';
import UserCard from '../../../components/user-card/user-card';

const usersFakeData = [
  {
    name: 'Wouter Kampmann',
    role: RoleEnum.SiteAdmin,
  },
  {
    name: 'Juan Julien',
    role: RoleEnum.CoreUnitAdmin,
  },
  {
    name: 'Juan Julien',
    role: RoleEnum.User,
  },
  {
    name: 'Juan Julien',
    role: RoleEnum.User,
  },
  {
    name: 'Juan Julien',
    role: RoleEnum.User,
  },
  {
    name: 'Wouter Kampmann',
    role: RoleEnum.SiteAdmin,
  },
  {
    name: 'Wouter Kampmann',
    role: RoleEnum.SiteAdmin,
  },
];

export default () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  return (
    <MainWrapper isLight={isLight}>
      <Container>
        <Tabs
          currentIndex={1}
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
        />
      </Container>
      <ContainerHeaderTitle>
        <Title>Manage Accounts</Title>
        <ContainerHeader>
          <Search>
            <SearchInput
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              handleClearSearch={() => {}}
              defaultValue={''}
              placeholder="Search"
              // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
              onChange={(value: string) => {}}
            />
          </Search>
          <Line isLight={isLight} />
          <ButtonArea>
            <CustomButton
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
        {usersFakeData.map((user) => {
          return <UserCard checked handleChange={() => {}} role={user.role} user={user.name || ''} />;
        })}
      </ContainerCards>
    </MainWrapper>
  );
};

const MainWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  marginTop: '88px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 24,
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

const Title = styled.div({
  display: 'none',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.4px',
  color: '#231536',
  '@media (min-width: 1194px)': {
    display: 'flex',
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
