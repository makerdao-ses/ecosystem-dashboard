import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';

const UserCardSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Container isLight={isLight}>
      <ContainerInsider>
        <UserHeader>
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton
            variant="rectangular"
            width={140}
            height={24}
            style={{
              marginLeft: 16,
              borderRadius: 8,
            }}
          />
        </UserHeader>
        <ViewProfileActions>
          <Skeleton variant="rectangular" width={60} height={14} style={{ borderRadius: 8 }} />
          <Skeleton variant="rectangular" width={128} height={34} style={{ borderRadius: 22 }} />
        </ViewProfileActions>
      </ContainerInsider>
      <Divider
        light
        sx={{
          bgcolor: isLight ? '#D4D9E1' : '#405361',
          marginTop: '32px',
          marginBottom: '16px',
          height: '1px',
        }}
        variant="fullWidth"
      />
      <Actions>
        <Skeleton variant="rectangular" width={92} height={34} style={{ borderRadius: 22 }} />
        <Skeleton variant="rectangular" width={70} height={22} style={{ borderRadius: 22 }} />
      </Actions>
    </Container>
  );
};

export default UserCardSkeleton;

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  width: 416,
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    width: 343,
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 369,
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    width: 355.33,
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    width: 373.33,
  },

  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    width: 416,
  },
}));

const ContainerInsider = styled.div({
  paddingTop: 16,
  paddingRight: 16,
  paddingLeft: 16,
});

const UserHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const ViewProfileActions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 32,
});

const Actions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px 16px',
});
