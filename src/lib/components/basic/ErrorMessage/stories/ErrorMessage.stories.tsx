//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ErrorMessage, { type ErrorMessageProps } from '@useweb/ui/ErrorMessage'

const defaultArgs: ErrorMessageProps = {
  error: 'ErrorMessage',
  message: 'ErrorMessage',
}

export default {
  title: 'lib/components/basic/Error Message',
  args: defaultArgs,
}

const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <ErrorMessage {...args} />
    </>
  )
}

export const Default = {
  render: (args: ErrorMessageProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: ErrorMessageProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
