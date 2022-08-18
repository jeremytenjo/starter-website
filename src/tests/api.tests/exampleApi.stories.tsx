import React from 'react'
import NextApiTester from '@useweb/next-api-tester'

export default {
  title: 'api/Api Example',
}

export const Test = () => (
  <NextApiTester
    name='example'
    payload={{
      method: 'post',
      body: JSON.stringify({
        name: 'YOU',
      }),
    }}
  />
)
