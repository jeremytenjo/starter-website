//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import ErrorMessage, { type ErrorMessageProps } from '../ErrorMessage'

import Docs from './ErrorMessage.docs'

const defaultArgs: ErrorMessageProps = {
  error: 'ErrorMessage',
}

export default {
  title: 'lib/components/basic/Error Message',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
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
