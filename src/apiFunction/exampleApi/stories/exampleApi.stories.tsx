import React from 'react'
import AsyncTester from '@useweb/async-tester'

import nextApi from '../../../lib/utils/nextjs/nextApi/nextApi'

export default {
  title: 'api/Api Example',
  args: {
    payload: {
      name: 'Ralph',
    },
  },
}

const fetcher = async (args) => {
  const data = await nextApi({
    name: 'example',
    payload: args.payload,
  })

  return data
}

export const Test = (args) => {
  return <AsyncTester fn={async () => fetcher(args)} autoExec />
}
