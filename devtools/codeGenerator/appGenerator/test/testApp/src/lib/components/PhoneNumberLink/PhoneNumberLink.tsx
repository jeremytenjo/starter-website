import React from 'react'
import Box from '@useweb/ui/Box'

export type PhoneNumberLinkProps = { name: string }

export default function PhoneNumberLink({
  name = 'PhoneNumberLink',
}: PhoneNumberLinkProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='PhoneNumberLink' sx={{}}>
      {children}
    </Box>
  )
}
