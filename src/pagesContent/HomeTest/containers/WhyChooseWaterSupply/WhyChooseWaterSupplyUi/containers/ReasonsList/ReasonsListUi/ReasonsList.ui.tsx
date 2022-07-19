import React from 'react'
import Box from '@useweb/ui/Box'

export type ReasonsListUiProps = {
  title: string,
}

export default function ReasonsListUi(props: ReasonsListUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ReasonsList' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: ReasonsListUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
