import React from 'react'
import NextApiTester from '@useweb/next-api-tester'

export default {
  title: 'api/Api Example',
  args: {
    body: {
      name: 'Ralph',
    },
  },
}

export const Test = (args) => {
  return (
    <NextApiTester
      name='example'
      payload={{
        method: 'post',
        body: args.body,
      }}
    />
  )
}
