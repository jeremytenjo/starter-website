//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import GoogleButton, { type GoogleButtonProps } from '../GoogleButton'

const defaultArgs: GoogleButtonProps = {}

export default {
  title: 'lib/components/auth/Google Button',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <GoogleButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: GoogleButtonProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: GoogleButtonProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
