import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import tokens from '../theme/tokens/tokens'
import setMuiDocumentData from '../theme/mui/setMuiDocumentData'

type DocumentProps = {
  emotionStyleTags: any
}

export default class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={tokens.colors.primary.main} />
          <link rel='icon' type='image/svg+xml' href='/images/logo/logo.svg' />

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => setMuiDocumentData(ctx, Document)
