import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import { HeaderWrapper } from '../src/stories/containers/dashboard-wrapper/header-wrapper';
import Head from 'next/head';
import '../styles/globals.scss';
import createEmotionCache from '../src/core/utils/emotion-cache';
import { NextPage } from 'next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, useThemeContext } from '../src/core/context/ThemeContext';

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
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <Provider store={store}>

          <Head>
            <title>MakerDao - Dashboard</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <HeaderWrapper themeMode={themeMode} toggleTheme={toggleTheme}
          >
            <Component {...pageProps} />
          </HeaderWrapper>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
