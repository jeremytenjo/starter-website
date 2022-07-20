import React from 'react'
import Box from '@useweb/ui/Box'

import Description from './containers/Description/Description'
import ReasonsList from './containers/ReasonsList/ReasonsList'

export default function WhyChooseWaterSupplyUi() {
  return (
    <Wrapper>
      <Description />
      <ReasonsList />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='WhyChooseWaterSupply' sx={{}}>
      {children}
    </Box>
  )
}
