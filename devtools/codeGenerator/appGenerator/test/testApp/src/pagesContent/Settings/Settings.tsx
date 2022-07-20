import React from 'react'
import Box from '@useweb/ui/Box'

export default function SettingsContent() {
  return <Wrapper>Settings</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='settings' sx={{}}>
      {children}
    </Box>
  )
}
