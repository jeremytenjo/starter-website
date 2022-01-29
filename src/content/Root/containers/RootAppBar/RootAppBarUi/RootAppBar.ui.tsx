import React from 'react'
import Box from '@mui/material/Box'

import type ImageSchema from '../../../../../data/schemas/ImageSchema'
import type IconSchema from '../../../../../data/schemas/IconSchema'

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
