import React from 'react'

import BioUi, { type BioUiProps } from './BioUi/Bio.ui'

export default function Bio() {
  const uiProps: BioUiProps = {
    title: 'Bio',
  }

  return <BioUi {...uiProps} />
}
