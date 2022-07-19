//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import PhoneNumberLink, { type PhoneNumberLinkProps } from '../PhoneNumberLink'

import Docs from './PhoneNumberLink.docs'

const defaultArgs: PhoneNumberLinkProps = {
  name: 'PhoneNumberLink',
}

export default {
  title: 'lib/components/PhoneNumberLink',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: PhoneNumberLinkProps) => {
  return (
    <>
      <PhoneNumberLink {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: PhoneNumberLinkProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
