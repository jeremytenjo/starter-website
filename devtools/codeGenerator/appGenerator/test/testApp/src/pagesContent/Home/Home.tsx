import React from 'react'
import Box from '@useweb/ui/Box'

import Hero from './containers/Hero/Hero'
import WhyChooseWaterSupply from './containers/WhyChooseWaterSupply/WhyChooseWaterSupply'
import Certificates from './containers/Certificates/Certificates'

export default function HomeContent() {
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
    <Box data-id='Home' sx={{}}>
      {children}
    </Box>
  )
}
