//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import SignInUserForm from '../SignInUserForm'

const defaultArgs = {
  name: 'signInUserForm',
}

export default {
  title: 'lib/integrations/Google/Firebase/auth/Sign In User Form',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = () => {
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
      <SignInUserForm />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
