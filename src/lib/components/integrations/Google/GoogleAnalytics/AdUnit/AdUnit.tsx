import React from 'react'

import AdUnitUi, { type AdUnitUiProps } from './AdUnitUi/AdUnit.ui'

type AdUnitProps = {
  sx?: AdUnitUiProps['sx']
}

export default function AdUnit({ sx = {} }: AdUnitProps) {
  const enalbed = true

  return <AdUnitUi enalbed={enalbed} sx={sx} />
}
