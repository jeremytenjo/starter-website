import React from 'react'
import FirebaseFunctionTester, {
  type FirebaseFunctionTesterProps,
} from '@useweb/firebase-function-tester'

import type { FirebaseFunctionExampleProps } from '../firebaseFunctionExample'

type ArgsProps = FirebaseFunctionTesterProps<any, FirebaseFunctionExampleProps>

const args: ArgsProps = {
  functionName: 'firebaseFunctionExample',
  payload: {
    name: 'jeremy',
  },
}

export default {
  title: 'Cloud Functions/firebase/firebaseFunctionExample',
  args,
}

export const Default = {
  render: (args: ArgsProps) => {
    return <FirebaseFunctionTester {...args} />
  },
}
