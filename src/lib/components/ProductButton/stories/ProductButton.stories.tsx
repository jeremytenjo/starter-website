//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ProductButton, { type ProductButtonProps } from '../ProductButton'
import productStubs from '../../../../data/products/products.stubs'

import Docs from './ProductButton.docs.mdx'

export default {
  title: 'lib/components/ProductButton',
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
      <ProductButton {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: ProductButtonProps = productStubs[1]

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: ProductButtonProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
