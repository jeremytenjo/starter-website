import React from 'react'
import Box from '@useweb/ui/Box'

import Hero from './containers/Hero/Hero'
import Quote from './containers/Quote/Quote'
import Bio from './containers/Bio/Bio'

export default function DrOsbornePartnershipContent() {
  return (
    <Wrapper>
      <Hero />
      <Quote />
      <Bio />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='DrOsbornePartnership' sx={{}}>
      {children}
    </Box>
  )
}
