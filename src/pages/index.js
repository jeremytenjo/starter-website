import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Text from '../lib/components/Text/Text'

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Text text='Home Page' />
      </Box>
    </Container>
  )
}
