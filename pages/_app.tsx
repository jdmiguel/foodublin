import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { throttle } from 'lodash';

import appReducer from '../store/reducer';

import { InitialAppState } from '../helpers/types';
import { DEFAULT_BREADCRUMB } from '../helpers/staticData';
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from '../helpers/utils';
import '../helpers/Grid/Grid.scss';
import { GlobalStyles } from '../helpers/GlobalStylesHelper';
import { theme } from '../helpers/Theme';

const localState = loadStateFromLocalStorage();

const defaultAppState: InitialAppState = {
  favorites: [],
  relatedRestaurants: [],
  breadcrumbs: [DEFAULT_BREADCRUMB],
};

const store = configureStore({
  reducer: appReducer,
  preloadedState: localState || defaultAppState,
});

store.subscribe(
  throttle(() => {
    saveStateToLocalStorage(store.getState());
  }, 1000),
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
