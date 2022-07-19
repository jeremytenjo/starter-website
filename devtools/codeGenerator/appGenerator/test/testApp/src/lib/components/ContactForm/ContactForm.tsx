import React from 'react'
import Box from '@useweb/ui/Box'

export type ContactFormProps = { name: string }

export default function ContactForm({ name = 'ContactForm' }: ContactFormProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ContactForm' sx={{}}>
      {children}
    </Box>
  )
}
