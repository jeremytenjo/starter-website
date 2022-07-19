//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContactBlock, { type ContactBlockProps } from '../ContactBlock'

import Docs from './ContactBlock.docs'

const defaultArgs: ContactBlockProps = {
  name: 'ContactBlock',
}

export default {
  title: 'lib/components/ContactBlock',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ContactBlockProps) => {
  return (
    <>
      <ContactBlock {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContactBlockProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
