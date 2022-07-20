import React from 'react'
import Box from '@useweb/ui/Box'

export type FooterProps = { name: string }

export default function Footer({ name = 'Footer' }: FooterProps) {
  return (
    <Wrapper>
      {name}
      <ContactUsForm {...props} />
      <Copyright {...props} />
      <Info {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Footer' sx={{}}>
      {children}
    </Box>
  )
}

const ContactUsForm = (props: FooterProps) => {
  return (
    <Box data-id='ContactUsForm' sx={{}}>
      ContactUsForm
    </Box>
  )
}
const Copyright = (props: FooterProps) => {
  return (
    <Box data-id='Copyright' sx={{}}>
      Copyright
    </Box>
  )
}
const Info = (props: FooterProps) => {
  return (
    <Box data-id='Info' sx={{}}>
      Info
    </Box>
  )
}
