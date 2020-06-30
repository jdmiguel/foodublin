import App from 'next/app';
import Router from 'next/router';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import '../helpers/Grid/Grid.scss';

import { GlobalStyles } from '../helpers/GlobalStylesHelper';
import { theme } from '../helpers/Theme';

Router.events.on('routeChangeComplete', (url: string) => {
  (window as any).dataLayer.push({
    url,
    event: 'Pageview',
  });
});

export default class MyApp extends App {
  async componentDidMount() {
    // @ts-ignore
    await import('picturefill');
  }

  render() {
    const {
      Component,
      pageProps,
      router: { asPath },
    } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} path={asPath} />
      </ThemeProvider>
    );
  }
}
