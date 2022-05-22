// https://storybook.js.org/docs/react/api/argtypes
import React from 'react'

import AsyncTester, {
  type AsyncTesterProps,
} from '../../../lib/components/data/AsyncTester/AsyncTester'

import getProductCategories from './getProductCategories.prismic'
import getProducts from './getProducts.prismic'

export default {
  title: 'api/products/prismic',
  args: {
    autoExec: true,
  },
}

const Template = (args) => {
  return <AsyncTester {...args} />
}

// Product
export const Product = Template.bind({}) as any

const ProductArgs: AsyncTesterProps = {
  fn: getProducts,
}

Product.args = ProductArgs

// Product Categories
export const ProductCategories = Template.bind({}) as any

const ProductCategoriesArgs: AsyncTesterProps = {
  fn: getProductCategories,
}

ProductCategories.args = ProductCategoriesArgs
