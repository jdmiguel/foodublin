import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { throttle } from 'lodash';
import appReducer from '@/store/redux/reducer';
import { InitialAppState } from '@/store/redux/types';
import { DEFAULT_BREADCRUMB } from '@/store/statics';
import '@/helpers/Grid/Grid.scss';
import { GlobalStyles } from '@/helpers/GlobalStylesHelper';
import { theme } from '@/helpers/Theme';

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveStateToLocalStorage = (state: InitialAppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(`${error} on trying to save global state in LocalStorage`);
  }
};

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

const handleRouteChange = () => {
  window.scrollTo(0, 0);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Discover the best restaurants in dublin and taste your favorite kind of food"
        />
        <meta
          name="keywords"
          content="Restaurant, Venues, Establishment, Food, Cuisines, Dublin"
        />
        <meta name="author" content="Jaime De Miguel Alcobendas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Foodublin - Discover the best restaurants in Dublin</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
