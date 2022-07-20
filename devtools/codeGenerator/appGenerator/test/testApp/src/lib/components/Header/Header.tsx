import React from 'react'
import Box from '@useweb/ui/Box'

export type HeaderProps = { name: string }

export default function Header({ name = 'Header' }: HeaderProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Header' sx={{}}>
      {children}
    </Box>
  )
}
