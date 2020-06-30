import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { CDN_URL_STATIC_DIRECTORY, GOOGLE_TAG_MANAGER } from '../helpers/utils';

export default class MyDocument extends Document {
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

  initGoogleTagManager() {
    return {
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER}');
      `,
    };
  }

  customScript() {
    return {
      __html: `
        // Picture element HTML5 shiv
        document.createElement( "picture" );
      `,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={this.initGoogleTagManager()} />
          <script dangerouslySetInnerHTML={this.customScript()} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css?family=Baloo+Chettan+2:400,500,600,800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/favicon.ico`}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-60x60.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/apple-icon-180x180.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/android-icon-192x192.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/favicon-96x96.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${CDN_URL_STATIC_DIRECTORY}/favicons/favicon-16x16.png`}
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content={`${CDN_URL_STATIC_DIRECTORY}/favicons/ms-icon-144x144.png`}
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <noscript>
            <iframe
              title="gtm_iframe"
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER}`}
              height="0"
              width="0"
              style={{
                display: 'none',
                visibility: 'hidden',
              }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
