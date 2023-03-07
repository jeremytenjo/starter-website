//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import signUpWithEmailPassword, {
  type SignUpWithEmailPasswordProps,
  type SignUpWithEmailPasswordReturn,
} from '../signUpWithEmailPassword'

const defaultArgs: SignUpWithEmailPasswordProps = {
  email: '',
  password: '',
}

export default {
  title: 'lib/integrations/Google/Firebase/auth/Sign Up With Email Password',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await signUpWithEmailPassword({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<SignUpWithEmailPasswordReturn, SignUpWithEmailPasswordProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: SignUpWithEmailPasswordProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: SignUpWithEmailPasswordProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
