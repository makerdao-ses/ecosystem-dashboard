import styled from '@emotion/styled';
import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
import { useLayoutEffect } from 'react';
import lightTheme from '../../../styles/theme/light';
import { useScrollLock } from '../hooks/scroll-hooks';
import { useCookiesContextTracking } from './CookiesContext';
import { useThemeContext } from './ThemeContext';
import type { ReactNode } from 'react';

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const { themeMode, isLight } = useThemeContext();
  const { lockScroll, unlockScroll } = useScrollLock();

  const {
    isShowBanner,
    setAnalyticsCheckbox,
    analyticsCheckbox,
    functionalCheckbox,
    handleAcceptCookies,
    handleRejectCookies,
    setFunctionalCheckbox,
  } = useCookiesContextTracking();

  useLayoutEffect(() => {
    if (isShowBanner) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
      }, 100);
      lockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isShowBanner, lockScroll, unlockScroll]);

  return (
    <>
      {children}
      {isShowBanner && themeMode !== undefined && <ContainerOverlay isLight={isLight} />}
      {isShowBanner && themeMode !== undefined && (
        <PolicyBannerPosition>
          <CookiesPolicyBanner
            functionalCheckbox={functionalCheckbox}
            analyticsCheckbox={analyticsCheckbox}
            setFunctionalCheckbox={setFunctionalCheckbox}
            setAnalyticsCheckbox={setAnalyticsCheckbox}
            handleAcceptCookies={handleAcceptCookies}
            handleRejectCookies={handleRejectCookies}
            isLight={isLight}
          />
        </PolicyBannerPosition>
      )}
    </>
  );
};

export default MainWrapper;

const ContainerOverlay = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 4,
  height: 'calc(100vh - 282px)',
  background: 'rgba(52, 52, 66, 0.1)',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    height: 'calc(100vh - 458px)',
  },
}));

const PolicyBannerPosition = styled.div({
  bottom: 0,
  zIndex: 4,
  width: '100%',
  position: 'fixed',
  borderRadius: '90px',
  transition: 'all 0.5s ease-in',
});
