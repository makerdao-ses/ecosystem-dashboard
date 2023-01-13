import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../src/core/utils/gtag';
import type { DocumentContext } from 'next/document';

interface Props {
  isAnalyticsActive: boolean;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    let isAnalyticsActive = false;
    if (ctx.req && ctx.req.headers.cookie) {
      try {
        const decodedCookie = decodeURIComponent(ctx.req.headers.cookie);
        const rawAnalyticsTracking = decodedCookie.split(';').find((item) => item.includes('analyticsTracking')) || '';
        isAnalyticsActive = rawAnalyticsTracking.split('=')[1] === 'true';
      } catch (e) {
        console.error(e);
      }
    }

    return {
      ...initialProps,
      isAnalyticsActive,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {GA_TRACKING_ID && this.props.isAnalyticsActive && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                    });
                `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
