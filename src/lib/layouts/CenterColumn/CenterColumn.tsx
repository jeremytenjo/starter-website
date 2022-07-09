import React from 'react'
import Box, { BoxProps } from '@useweb/ui/Box'

export type CenterColumnProps = { children: any; sx?: BoxProps['sx'] }

export default function CenterColumn({ children, sx = {} }: CenterColumnProps) {
  return <Wrapper sx={sx}>{children}</Wrapper>
}

const Wrapper = ({ children, sx }) => {
  return (
    <Box
      data-id='CenterColumn'
      sx={{
        width: '100%',
        display: 'block',
        margin: '0 auto',
        maxWidth: '769px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
