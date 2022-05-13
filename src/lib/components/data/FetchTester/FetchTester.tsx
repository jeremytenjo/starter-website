import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import useFetch, { type RequestProps } from '@useweb/use-fetch'

import ReactJson from '../../ReactJson/ReactJson'

export type FetchTesterProps = { url: string; payload?: RequestProps }

export default function FetchTester({ url, payload }: FetchTesterProps) {
  const func = useFetch({ url })

  return (
    <Box sx={{ p: 2 }}>
      <Button
        onClick={() => func.request(payload)}
        sx={{ mb: 2, color: 'black.main', backgroundColor: 'white.main' }}
        variant='contained'
      >
        Execute
      </Button>

      {func.fetching && <LinearProgress sx={{ width: '100%', mb: 2 }} />}

      {func.error && <p>{func.error.toString()}</p>}

      {func.response && <ReactJson json={func.response} />}
    </Box>
  )
}
