import React from 'react'

import DescriptionUi, { type DescriptionUiProps } from './DescriptionUi/Description.ui'

export default function Description() {
  const uiProps: DescriptionUiProps = {
    title: 'Description',
  }

  return <DescriptionUi {...uiProps} />
}
