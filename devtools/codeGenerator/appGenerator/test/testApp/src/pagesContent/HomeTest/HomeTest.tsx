import React from 'react'
import Box from '@useweb/ui/Box'

import Hero from './containers/Hero/Hero'
import WhyChooseWaterSupply from './containers/WhyChooseWaterSupply/WhyChooseWaterSupply'
import Certificates from './containers/Certificates/Certificates'

export default function HomeTestContent() {
  return (
    <Wrapper>
      <Hero />
      <WhyChooseWaterSupply />
      <Certificates />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='HomeTest' sx={{}}>
      {children}
    </Box>
  )
}
