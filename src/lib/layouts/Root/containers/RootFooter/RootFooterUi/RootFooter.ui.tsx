import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type RootFooterUiProps = {
  title: string
}

export default function RootFooterUi({ title }: RootFooterUiProps) {
  return (
    <Wrapper>
      <Copyright />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='RootFooter'
      sx={{
        m: '0 auto',
        mt: '250px',

        maxWidth: '700px',
        display: 'block',
      }}
    >
      {children}
    </Box>
  )
}

const Copyright = ({}) => {
  return (
    <Box data-id='CopyRight' sx={{}}>
      <Text
        text={`Created by Jeremy Tenjo. All Rights Reserved.`}
        sx={{ color: 'grey.two', textAlign: 'center', fontSize: '14px' }}
      />
    </Box>
  )
}
