import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

export type CenterColumnProps = {
  children: any
  sx?: BoxProps['sx']
  dataId?: string
  'data-id'?: string
}

export default function CenterColumn({
  children,
  sx = {},
  dataId = 'CenterColumn',
  ...rest
}: CenterColumnProps) {
  return (
    <Wrapper sx={sx} dataId={rest['data-id'] || dataId}>
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
        margin: '0 auto',
        maxWidth: '1483px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
