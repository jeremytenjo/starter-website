/* eslint-disable jsx-a11y/alt-text */
//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import Image, { type ImageProps } from 'next/image'

import Docs from './Image.docs.mdx'

export default {
  title: 'lib/components/Image',
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
      <Image {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: ImageProps = {
  src: '/images/logo/assets/logo.png',
  width: 100,
  height: 100,
  alt: 'hello',
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: ImageProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
