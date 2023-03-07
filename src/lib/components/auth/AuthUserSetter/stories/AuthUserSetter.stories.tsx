//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import AuthUserSetter, { type AuthUserSetterProps } from '../AuthUserSetter'

const defaultArgs: AuthUserSetterProps = {
  open: true,
}

export default {
  title: 'lib/components/auth/Auth User Setter',
  args: defaultArgs,
}

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
      <AuthUserSetter {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: AuthUserSetterProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
