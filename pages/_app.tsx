import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import Head from 'next/head';
import '../styles/globals.scss';
import { NextPage } from 'next';
import { EmotionCache } from '@emotion/react';
import { ThemeProvider } from '../src/core/context/ThemeContext';
import { FeatureFlagsProvider } from '../src/core/context/FeatureFlagsProvider';
import { CURRENT_ENVIRONMENT } from '../src/config/endpoints';
import { featureFlags } from '../feature-flags/feature-flags';
import { SEOHead } from '../src/stories/components/seo-head/seo-head';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider>
      <Provider store={store}>
        <SEOHead title="MakerDAO - Dashboard" description="" />
        <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
          <Component {...pageProps} />
        </FeatureFlagsProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
