import React from 'react'

import RootHeaderUi, { type RootHeaderUiProps } from './RootHeaderUi/RootHeader.ui'

export type RootHeaderProps = RootHeaderUiProps

export default function RootHeader(props: RootHeaderProps) {
  return <RootHeaderUi {...props} />
}
