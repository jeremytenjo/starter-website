//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import type ProductSchema from '../../../../../../data/products/product.schema'
import ProductsStubs from '../../../../../../data/products/products.stubs'
import ProductSearchResult from '../../../store/ProductSearchResult/ProductSearchResult'
import Autocomplete, { type AutocompleteProps } from '../Autocomplete'

import Docs from './Autocomplete.docs.mdx'

const defaultArgs: AutocompleteProps = {
  data: ProductsStubs,
  filterFn: ({ query, listItem }: { query: string; listItem: ProductSchema }) =>
    listItem.data.name.toLowerCase().includes(query.toLowerCase()),
  ListItemComponent: (props) => <ProductSearchResult {...props} onClick={() => null} />,
  placeholder: 'Search by name or paste TikTok link',
  inputProps: {
    autoFocus: true,
  },
}

export default {
  title: 'lib/components/basic/search/Autocomplete/Autocomplete',
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
      <Autocomplete {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: AutocompleteProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
