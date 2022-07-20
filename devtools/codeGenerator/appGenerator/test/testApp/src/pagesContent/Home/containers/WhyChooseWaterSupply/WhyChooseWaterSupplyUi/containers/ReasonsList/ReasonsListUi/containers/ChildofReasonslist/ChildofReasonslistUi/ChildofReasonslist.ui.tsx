import React from 'react'
import Box from '@useweb/ui/Box'

export type ChildofReasonslistUiProps = {
  title: string,
}

export default function ChildofReasonslistUi(props: ChildofReasonslistUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ChildofReasonslist' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: ChildofReasonslistUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
