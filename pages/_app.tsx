import isEmpty from 'lodash/isEmpty';
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { featureFlags } from '../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../src/config/endpoints';
import { AuthContextProvider } from '../src/core/context/AuthContext';
import { CookiesProviderTracking } from '../src/core/context/CookiesContext';
import { FeatureFlagsProvider } from '../src/core/context/FeatureFlagsProvider';
import { ThemeProvider } from '../src/core/context/ThemeContext';
import { store } from '../src/core/store/store';
import { getAuthFromStorage } from '../src/core/utils/auth-storage';
import { parseCookie } from '../src/core/utils/cookie-helpers';
import * as gtag from '../src/core/utils/gtag';
import { ContainerNotification } from '../src/stories/components/notification/notification';
import { SEOHead } from '../src/stories/components/seo-head/seo-head';
import AppLayout from '../src/stories/containers/layout/layout';
import type { CookiesInterface } from '../src/core/utils/types-helpers';
import type { EmotionCache } from '@emotion/react';
import type { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

// disable useLayoutEffect SSR warnings to avoid log spamming the console
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
  protected?: boolean;
  isLight: boolean;
  cookiesObject: CookiesInterface;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps, isLight, cookiesObject } = props;
  const router = useRouter();

  useEffect(() => {
    if (gtag.GA_TRACKING_ID && cookiesObject.allowsAnalyticsTracking) {
      const handleRouteChange = (url: URL) => {
        gtag.pageView(url);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [cookiesObject.allowsAnalyticsTracking, router.events]);

  useEffect(() => {
    const authData = getAuthFromStorage();
    if (props.pageProps.protected && (isEmpty(authData) || !authData?.authToken)) {
      router.push('/login');
    }
  }, [props.pageProps.protected, router]);
  return (
    <CookiesProvider>
      <Provider store={store}>
        <CookiesProviderTracking cookiesObject={cookiesObject}>
          <AuthContextProvider>
            <ThemeProvider isLightApp={isLight}>
              <SEOHead title="MakerDAO - Dashboard" description="" />
              <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
                <ContainerNotification limit={3} />
              </FeatureFlagsProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </CookiesProviderTracking>
      </Provider>
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  let themeMode = '';
  const cookiesObject: CookiesInterface = {
    allowsThemeTracking: false,
    allowsTimestampTracking: false,
    allowsAnalyticsTracking: false,
  };

  if (ctx.req?.headers.cookie) {
    const cookiesParsed = parseCookie(ctx.req?.headers.cookie);
    cookiesObject.allowsThemeTracking = Boolean(cookiesParsed?.themeTracking);
    cookiesObject.allowsTimestampTracking = Boolean(cookiesParsed?.timestampTracking);
    cookiesObject.allowsAnalyticsTracking = Boolean(cookiesParsed?.analyticsTracking);
    themeMode = cookiesParsed.THEME_MODE;
  }
  const isLight = cookiesObject?.allowsThemeTracking ? themeMode === 'light' : true;
  return {
    isLight,
    cookiesObject,
  };
};

export default MyApp;
