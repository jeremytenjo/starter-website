import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

import Text from '../../../Text/Text'

export type AdUnitUiProps = {
  enalbed: boolean
  sx?: BoxProps['sx']
}

export default function AdUnitUi({ enalbed, sx = {} }: AdUnitUiProps) {
  return (
    <Wrapper sx={sx}>
      <Text text='AdUnit' />
    </Wrapper>
  )
}

// Add a placeholder for local dev
const Wrapper = ({ children, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
