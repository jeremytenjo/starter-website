import React from 'react'
import Box from '@useweb/ui/Box'

export type DescriptionUiProps = {
  title: string,
}

export default function DescriptionUi(props: DescriptionUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Description' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: DescriptionUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
