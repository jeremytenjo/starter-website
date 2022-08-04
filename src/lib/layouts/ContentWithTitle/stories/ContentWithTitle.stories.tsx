//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContentWithTitle, { type ContentWithTitleProps } from '../ContentWithTitle'

import Docs from './ContentWithTitle.docs'

const defaultArgs: ContentWithTitleProps = {
  title: 'ContentWithTitle',
  content: () => <div>content</div>,
}

export default {
  title: 'lib/layouts/ContentWithTitle',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ContentWithTitleProps) => {
  return (
    <>
      <ContentWithTitle {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContentWithTitleProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
