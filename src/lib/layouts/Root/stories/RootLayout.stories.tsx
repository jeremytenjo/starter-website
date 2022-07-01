//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import RootLayout, { type RootLayoutProps } from '../RootLayout'
import ProductsStubs from '../../../../data/products/products.stubs'

import Docs from './RootLayout.docs.mdx'

const defaultArgs: RootLayoutProps = {
  children: <main>hello</main>,
  rootLayoutData: {
    rootHeaderProps: {
      navLinks: [
        {
          id: 1,
          label: 'Home',
          url: '/',
        },
      ],
      products: ProductsStubs,
    },
  },
}

export default {
  title: 'lib/layouts/Root/RootLayout',
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
      <RootLayout {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: RootLayoutProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
