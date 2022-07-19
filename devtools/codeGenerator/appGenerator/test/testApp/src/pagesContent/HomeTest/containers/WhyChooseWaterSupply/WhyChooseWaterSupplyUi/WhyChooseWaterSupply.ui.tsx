import React from 'react'
import Box from '@useweb/ui/Box'

export type WhyChooseWaterSupplyUiProps = {
  title: string,
}

export default function WhyChooseWaterSupplyUi(props: WhyChooseWaterSupplyUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
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
