//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import PrivatePageOverlay from '../PrivatePageOverlay'

const defaultArgs: any = {
  title: 'Sign in',
}

export default {
  title: 'lib/components/auth/Private Page Overlay',
  args: defaultArgs,
  parameters: {
    signInAs: 'creator1',
  },
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
      <PrivatePageOverlay {...args} />
    </>
  )
}

export const Default = {
  render: (args: any) => {
    return <Template {...args} />
  },
}

// const variantArgs: any = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
