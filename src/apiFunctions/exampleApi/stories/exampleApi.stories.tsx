import React from 'react'
import AsyncTester from '@useweb/async-tester'

import nextApi from '../../../lib/utils/nextjs/nextApi/nextApi'
import { type ExampleApiProps } from '../exampleApi'

export default {
  title: 'Cloud Functions/next/firebaseFunctionExample',
  args: {
    payload: {
      name: 'Ralph',
    } as ExampleApiProps,
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
