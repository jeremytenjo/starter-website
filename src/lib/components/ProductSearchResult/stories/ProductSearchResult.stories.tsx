//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ProductSearchResult, {
  type ProductSearchResultProps,
} from '../ProductSearchResult'
import ProductsStubs from '../../../../data/products/products.stubs'

import Docs from './ProductSearchResult.docs.mdx'

export default {
  title: 'lib/components/ProductSearchResult',
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
      <ProductSearchResult {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: ProductSearchResultProps = ProductsStubs[0]

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: ProductSearchResultProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
