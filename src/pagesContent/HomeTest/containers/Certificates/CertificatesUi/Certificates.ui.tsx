import React from 'react'
import Box from '@useweb/ui/Box'

export type CertificatesUiProps = {
  title: string,
}

export default function CertificatesUi(props: CertificatesUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Certificates' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: CertificatesUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
