//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContentWithHeader, { type ContentWithHeaderProps } from '../ContentWithHeader'

import Docs from './ContentWithHeader.docs'

const defaultArgs: ContentWithHeaderProps = {
  title: 'ContentWithHeader',
  content: 'content',
}

export default {
  title: 'lib/layouts/ContentWithHeader',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ContentWithHeaderProps) => {
  return (
    <>
      <ContentWithHeader {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContentWithHeaderProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
