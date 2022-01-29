import React from 'react'
import Box from '@mui/material/Box'

import type IconSchema from '../../../../../data/commonSchemas/IconSchema'

type Props = {
  icon: IconSchema
  message: string
  contactMeIcons: {
    url: string
    icon: IconSchema
  }[]
}

export default function RootFooterUi({ icon }: Props) {
  return <Box>Footer</Box>
}
