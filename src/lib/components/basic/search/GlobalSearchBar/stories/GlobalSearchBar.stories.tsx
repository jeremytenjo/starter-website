//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import GlobalSearchBar, { type GlobalSearchBarProps } from '../GlobalSearchBar'
import ProductsStubs from '../../../../../../data/products/products.stubs'

import Docs from './GlobalSearchBar.docs.mdx'

export default {
  title: 'lib/components/basic/search/GlobalSearchBar',
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
      <GlobalSearchBar {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: GlobalSearchBarProps = {
  open: true,
  onClose: () => null,
  data: ProductsStubs,
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: GlobalSearchBarProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
