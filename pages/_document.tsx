import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { CDN_URL_STATIC_DIRECTORY } from '../helpers/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#D48C24" />
          <meta name="theme-color" content="#D48C24" />
          <link
            href="https://fonts.googleapis.com/css?family=Baloo+Chettan+2:400,500,600,800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="preload"
            as="image"
            href={`${CDN_URL_STATIC_DIRECTORY}/images/food.jpg`}
          />
          <link
            rel="preload"
            as="image"
            href={`${CDN_URL_STATIC_DIRECTORY}/images/logo.svg`}
          />

          <link
            rel="icon"
            href={`${CDN_URL_STATIC_DIRECTORY}/images/favicon.ico`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
