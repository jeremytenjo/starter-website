import React from 'react'
import Box from '@useweb/ui/Box'

export type HeroUiProps = {
  title: string,
}

export default function HeroUi(props: HeroUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Hero' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: HeroUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
