//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import SignUpUserForm, { type SignUpUserFormProps } from '../SignUpUserForm'

const defaultArgs: SignUpUserFormProps = {
  name: 'signUpUserForm',
}

export default {
  title: 'lib/integrations/Google/Firebase/auth/signUpUserForm/ui/Sign Up User Form',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <PixelPerfect
        assets={[
          {
            width: 0,
            url: '',
          },
          {
            width: 1920,
            url: '',
          },
        ]}
      />
      <SignUpUserForm {...args} />
    </>
  )
}

export const Default = {
  render: (args: SignUpUserFormProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: SignUpUserFormProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
