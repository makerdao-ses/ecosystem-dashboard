import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import Head from 'next/head';
import '../styles/globals.scss';
import createEmotionCache from '../src/core/utils/emotion-cache';
import { NextPage } from 'next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '../src/core/context/ThemeContext';
import { FeatureFlagsProvider } from '../src/core/context/FeatureFlagsProvider';
import { flagsProduction } from '../feature-flags/feature-flags.production';

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <Provider store={store}>

          <Head>
            <title>MakerDao - Dashboard</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <FeatureFlagsProvider enabledFeatures={flagsProduction}>
            <Component {...pageProps} />
          </FeatureFlagsProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
