import styled from '@emotion/styled';
import { Modal, useMediaQuery } from '@mui/material';
import { Close } from '@ses/components/svg/close';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useLogin } from '../useLogin';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type LoginModalProps = {
  open: boolean;
  handleClose: () => void;
  autoClose?: boolean;
};

const LoginModal: React.FC<LoginModalProps> = ({ open = false, handleClose, autoClose = false }) => {
  const { form, loading, error, clearErrors, hasUserInactive, shouldKeepOpenModal } = useLogin();
  const { isLight } = useThemeContext();
  const isUpTablet = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const router = useRouter();

  useEffect(() => {
    if (autoClose && isUpTablet && open) {
      handleClose();
    }
  }, [autoClose, isUpTablet, open, handleClose]);

  const handleRedirectOrClose = () => {
    if (router.pathname === siteRoutes.login) {
      router.push(siteRoutes.home);
    }
    handleClose();
  };

  return (
    <Modal open={open || shouldKeepOpenModal} onClose={handleClose}>
      <LoginModalWrapper isLight={isLight}>
        <CloseWrapper>
          <Close onClick={handleRedirectOrClose} />
        </CloseWrapper>
        <FormContainer>
          <LoginForm
            form={form}
            clearErrors={clearErrors}
            hasUserInactive={hasUserInactive}
            loading={loading}
            error={error}
          />
        </FormContainer>
      </LoginModalWrapper>
    </Modal>
  );
};

export default LoginModal;

const LoginModalWrapper = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  height: '100%',
  background: isLight ? '#FFFFFF' : '#10191F',
  overflow: 'auto',
}));

const CloseWrapper = styled.div({
  position: 'absolute',
  top: 22,
  right: 22,
});

const FormContainer = styled.div({
  maxWidth: 375,
  paddingLeft: 40,
  paddingRight: 40,
  margin: '72px auto 0',
});
