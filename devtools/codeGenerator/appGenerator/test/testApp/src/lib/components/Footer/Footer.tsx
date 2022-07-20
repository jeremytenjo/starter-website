import React from 'react'
import Box from '@useweb/ui/Box'

export type FooterProps = { name: string }

export default function Footer({ name = 'Footer' }: FooterProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Footer' sx={{}}>
      {children}
    </Box>
  )
}
