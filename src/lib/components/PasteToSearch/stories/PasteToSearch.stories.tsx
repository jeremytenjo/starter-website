//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import PasteToSearch, { type PasteToSearchProps } from '../PasteToSearch'

import Docs from './PasteToSearch.docs.mdx'

export default {
  title: 'lib/components/PasteToSearch',
  args: {},
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
      <PasteToSearch {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: PasteToSearchProps = {
  data: [],
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: PasteToSearchProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
