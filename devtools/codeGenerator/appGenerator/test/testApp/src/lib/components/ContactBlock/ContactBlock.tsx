import React from 'react'
import Box from '@useweb/ui/Box'

export type ContactBlockProps = { name: string }

export default function ContactBlock({ name = 'ContactBlock' }: ContactBlockProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ContactBlock' sx={{}}>
      {children}
    </Box>
  )
}
