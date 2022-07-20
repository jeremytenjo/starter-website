import React from 'react'
import Box from '@useweb/ui/Box'

import Description from './containers/Description/Description'
import ReasonsList from './containers/ReasonsList/ReasonsList'

export type WhyChooseWaterSupplyUiProps = {
  title: string,
}

export default function WhyChooseWaterSupplyUi(props: WhyChooseWaterSupplyUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
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

const Title = (props: WhyChooseWaterSupplyUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
