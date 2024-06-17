import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import Profile from '@ses/components/svg/profile';
import { siteRoutes } from '@ses/config/routes';
import LoginModal from '@ses/containers/Auth/Login/LoginModal/LoginModal';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useState } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const LoginButton: React.FC = () => {
  const { isLight } = useThemeContext();
  const isUpTablet = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  return (
    <LoginButtonContainer>
      {isUpTablet ? (
        <LinkButton
          label={'Log in'}
          style={{
            padding: '8px 24px',
            border: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}!important`,
          }}
          styleText={{ color: isLight ? '#31424E' : '#EDEFFF' }}
          href={siteRoutes.login}
        />
      ) : (
        <MobileIcon isLight={isLight} onClick={() => setOpenLogin(true)}>
          <Profile width={20} height={17} fill={isLight ? '#231536' : '#EDEFFF'} />
        </MobileIcon>
      )}

      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} autoClose={true} />
    </LoginButtonContainer>
  );
};

export default LoginButton;

const LoginButtonContainer = styled.div({});

const MobileIcon = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,
  height: 35,
  borderRadius: '50%',
  border: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  cursor: 'pointer',
  marginRight: 16,
}));
