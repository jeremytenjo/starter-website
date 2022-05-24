//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import CategoryButton from '../CategoryButton'

import Docs from './CategoryButton.docs.mdx'
export default {
  title: 'lib/components/CategoryButton',
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
      <CategoryButton {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any
const defaultArgs = {
  id: '1',
  data: {
    name: 'Books',
    backgroundImage: {
      url: '/images/test/books.avif',
      dimensions: {
        width: 1036,
        height: 1381,
      },
      alt: 'null',
      copyright: null,
    },
    order: 1,
  },
}
Default.args = defaultArgs // export const Variant = Template.bind({}) as any
// const VariantArgs: CategoryButtonProps = {
//  ...defaultArgs,
//  name: 'World',
// }
// Variant.args = VariantArgs
