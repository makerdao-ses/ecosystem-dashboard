import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import { HeaderWrapper } from '../src/stories/containers/dashboard-wrapper/header-wrapper';
import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({
  Component, pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <HeaderWrapper>
        <Head>
          <title>MakerDao - Dashboard</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <Component {...pageProps} />
      </HeaderWrapper>
    </Provider>
  );
}

export default MyApp;
