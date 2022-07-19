//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import Footer, { type FooterProps } from '../Footer'

import Docs from './Footer.docs'

const defaultArgs: FooterProps = {
  name: 'Footer',
}

export default {
  title: 'lib/components/Footer',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: FooterProps) => {
  return (
    <>
      <Footer {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: FooterProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
