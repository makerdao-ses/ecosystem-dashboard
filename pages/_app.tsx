import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import '../styles/globals.scss';
import { NextPage } from 'next';
import { EmotionCache } from '@emotion/react';
import { ThemeProvider } from '../src/core/context/ThemeContext';
import { FeatureFlagsProvider } from '../src/core/context/FeatureFlagsProvider';
import { CURRENT_ENVIRONMENT } from '../src/config/endpoints';
import { featureFlags } from '../feature-flags/feature-flags';
import { SEOHead } from '../src/stories/components/seo-head/seo-head';
import { useRouter } from 'next/router';
import * as gtag from '../src/core/utils/gtag';
import { CookiesProviderTracking } from '../src/core/context/CookiesContext';
import { CookiesProvider, useCookies } from 'react-cookie';
import { AuthContextProvider } from '../src/core/context/AuthContext';
import { getAuthFromStorage } from '../src/core/utils/auth-storage';
import { ContainerNotification } from '../src/stories/components/notification/notification';
import AppLayout from '../src/stories/containers/layout/layout';

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
}

function MyApp(props: MyAppProps) {
  const [cookies] = useCookies(['analyticsTracking']);
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    if (gtag.GA_TRACKING_ID && cookies.analyticsTracking === 'true') {
      const handleRouteChange = (url: URL) => {
        gtag.pageView(url);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  useEffect(() => {
    const authData = getAuthFromStorage();
    if (props.pageProps.protected && (isEmpty(authData) || !authData?.authToken)) {
      router.push('/login');
    }
  }, []);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <CookiesProviderTracking>
          <AuthContextProvider>
            <ThemeProvider>
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

export default MyApp;
