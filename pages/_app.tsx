import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
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
import { CookiesProvider, useCookies } from 'react-cookie';
import * as gtag from '../src/core/utils/gtag';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const [cookies] = useCookies(['darkMode', 'timestamp', 'analytics']);
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    if (gtag.GA_TRACKING_ID && cookies.analytics === 'true') {
      const handleRouteChange = (url: URL) => {
        gtag.pageView(url);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);
  if (!pageLoaded) {
    return null;
  }
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider>
          <SEOHead title="MakerDAO - Dashboard" description="" />
          <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
            <Component {...pageProps} />
          </FeatureFlagsProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
