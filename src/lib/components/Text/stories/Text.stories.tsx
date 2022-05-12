//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import Text, { type TextProps } from '../Text'

import Docs from './Text.docs.mdx'

export default {
  title: 'lib/components/Text',
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
      <Text {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: TextProps = {
  text: 'Hello text component',
  variant: 'h1',
}

Default.args = defaultArgs

// export const Variant = Template.bind({})

// const VariantArgs: TextProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
