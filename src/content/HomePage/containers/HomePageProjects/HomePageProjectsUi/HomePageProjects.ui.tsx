import React from 'react'
import Box from '@mui/material/Box'

import type IconSchema from '../../../../../data/schemas/IconSchema'
import type ImageSchema from '../../../../../data/schemas/ImageSchema'

type Props = {
  projects: {
    type: 'apps' | 'OSS' | 'plugins'
    ringColor: string
    ringBlurSVG: IconSchema
    projects: {
      name: string
      nameColor: string
      description: string
      images: ImageSchema[]
      category?: string
      categoryIcon?: IconSchema
      cta: {
        label: string
        url: string
        startIcon?: IconSchema
      }
    }[]
  }[]
}

export default function HomePageProjectsUi(props: Props) {
  return <Box>Projects</Box>
}
