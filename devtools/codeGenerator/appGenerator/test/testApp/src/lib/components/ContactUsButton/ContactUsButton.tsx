import React from 'react'
import Box from '@useweb/ui/Box'

export type ContactUsButtonProps = { name: string }

export default function ContactUsButton({
  name = 'ContactUsButton',
}: ContactUsButtonProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ContactUsButton' sx={{}}>
      {children}
    </Box>
  )
}
