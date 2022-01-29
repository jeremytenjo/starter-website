import React from 'react'
import Box from '@mui/material/Box'

import type IconSchema from '../../../../../data/schemas/IconSchema'

type Props = {
  emoji: IconSchema
  text: string
}

export default function HomePageIntroUi(props: Props) {
  return <Box>Intro</Box>
}
