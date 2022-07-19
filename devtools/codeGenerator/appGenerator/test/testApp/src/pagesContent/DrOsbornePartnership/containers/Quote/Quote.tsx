import React from 'react'

import QuoteUi, { type QuoteUiProps } from './QuoteUi/Quote.ui'

export default function Quote() {
  const uiProps: QuoteUiProps = {
    title: 'Quote',
  }

  return <QuoteUi {...uiProps} />
}
