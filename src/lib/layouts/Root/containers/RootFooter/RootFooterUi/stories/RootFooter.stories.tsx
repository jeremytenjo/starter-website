//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import RootFooter, { type RootFooterUiProps } from '../RootFooter.ui'

import Docs from './RootFooter.docs.mdx'

const defaultArgs: RootFooterUiProps = {
  title: 'RootFooter',
}

export default {
  title: 'lib/layouts/root/Footer',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args) => {
  return (
    <>
      <RootFooter {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: RootFooterProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
