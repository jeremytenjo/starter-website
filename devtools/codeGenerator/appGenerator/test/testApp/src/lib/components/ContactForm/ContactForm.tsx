import React from 'react'
import Box from '@useweb/ui/Box'

export type ContactFormProps = { name: string }

export default function ContactForm(props: ContactFormProps) {
  return <Wrapper>ContactForm</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ContactForm' sx={{}}>
      {children}
    </Box>
  )
}
