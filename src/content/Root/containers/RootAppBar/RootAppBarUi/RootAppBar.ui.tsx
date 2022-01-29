import React from 'react'
import Box from '@mui/material/Box'

import type ImageSchema from '../../../../../data/commonSchemas/ImageSchema'
import type IconSchema from '../../../../../data/commonSchemas/IconSchema'

type Props = {
  profilePhoto: ImageSchema
  profileName: string
  navLinks: {
    label: string
    url?: string
    selector?: string
  }[]
  socialLinks: {
    icon: IconSchema
    url: string
  }[]
}

export default function RootAppBarUi({ profilePhoto }: Props) {
  return <Box>Navbar</Box>
}
