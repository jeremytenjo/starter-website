import React from 'react'

import ReasonsListUi, { type ReasonsListUiProps } from './ReasonsListUi/ReasonsList.ui'

export default function ReasonsList() {
  const uiProps: ReasonsListUiProps = {
    title: 'ReasonsList',
  }

  return <ReasonsListUi {...uiProps} />
}
