import React from 'react'
import Box, { BoxProps } from '@useweb/ui/Box'

export type CenterColumnProps = { children: any; sx?: BoxProps['sx']; dataId?: string }

export default function CenterColumn({
  children,
  sx = {},
  dataId = 'CenterColumn',
}: CenterColumnProps) {
  return (
    <Wrapper sx={sx} dataId={dataId}>
      {children}
    </Wrapper>
  )
}

const Wrapper = ({ children, sx, dataId }) => {
  return (
    <Box
      data-id={dataId}
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
