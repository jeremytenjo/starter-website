import React from 'react'
import FirebaseFunctionDashboard, {
  type FirebaseFunctionTesterProps,
} from '@useweb/firebase-function-tester'

import type { FirebaseFunctionExampleProps } from '../firebaseFunctionExample'

type FindStreamLinkArgsProps = FirebaseFunctionTesterProps<
  any,
  FirebaseFunctionExampleProps
>

const args: FindStreamLinkArgsProps = {
  functionName: 'firebaseFunctionExample',
  payload: {
    name: 'jeremy',
  },
}

export default {
  title: 'Firebase Functions/firebaseFunctionExample',
  args,
}

export const Default = {
  render: (args: FindStreamLinkArgsProps) => {
    return <FirebaseFunctionDashboard {...args} />
  },
}
