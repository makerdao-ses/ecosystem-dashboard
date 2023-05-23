import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useEffect } from 'react';
import type { WithIsLightAndClick } from '../../transparencyReportUtils';

interface Props {
  isOpen: boolean;
  handleOnClick: () => void;
}

const PopoverMobile: React.FC<React.PropsWithChildren<Props>> = ({ children, isOpen, handleOnClick }) => {
  const { isLight } = useThemeContext();
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const { lockScroll, unlockScroll } = useScrollLock();

  let md;
  if (typeof window !== 'undefined') {
    md = new MobileDetect(window.navigator?.userAgent);
  }
  const isMobileDevice = !!md?.mobile();

  useEffect(() => {
    if (isMobileDevice && isOpen) {
      const pageWrapper = getPageWrapper();
      if (pageWrapper) {
        pageWrapper.style.overflow = 'hidden';
      }

      lockScroll();
    }

    return () => {
      unlockScroll();

      if (isMobileDevice) {
        const pageWrapper = getPageWrapper();
        if (pageWrapper) {
          pageWrapper.style.overflow = '';
        }
      }
    };
  }, [isMobileDevice, isOpen, lockScroll, unlockScroll]);

  return (
    <>
      {isOpen && isMobileResolution && isMobileDevice && (
        <>
          <ModalSheet>{children}</ModalSheet>
          <ContainerOverlay isLight={isLight} onClick={handleOnClick} />
        </>
      )}
    </>
  );
};

export default PopoverMobile;

const ModalSheet = styled.div({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const ContainerOverlay = styled.div<WithIsLightAndClick>(({ isLight, onClick }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  cursor: onClick ? 'default' : undefined,
}));
