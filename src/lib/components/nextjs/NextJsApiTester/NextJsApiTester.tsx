import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import useFetch, { type RequestProps } from '@useweb/use-fetch'

import ReactJson from '../../ReactJson/ReactJson'

type Props = { name: string; payload?: RequestProps }

export default function NextjsApiTester({ name, payload }: Props) {
  const func = useFetch({ url: `http://localhost:3000/api/${name}` })

  return (
    <Box sx={{ p: 2 }}>
      <Button onClick={() => func.request(payload)} sx={{ mb: 2 }} variant='contained'>
        Execute
      </Button>

      {func.fetching && <LinearProgress sx={{ width: '100%' }} />}

      {func.error && <p>{func.error.toString()}</p>}

      {func.response && <ReactJson json={func.response} />}
    </Box>
  )
}
