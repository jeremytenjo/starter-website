import React from 'react'
import Box from '@useweb/ui/Box'

export type BioUiProps = {
  title: string,
}

export default function BioUi(props: BioUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Bio' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: BioUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
