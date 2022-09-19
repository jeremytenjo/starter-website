//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import getRootDataStubs from '../../../../data/_root/getRootDataStubs/getRootDataStubs'
import RootLayout, { type RootLayoutProps } from '../RootLayout'

import Docs from './RootLayout.docs.mdx'

const defaultArgs: RootLayoutProps = {
  ...getRootDataStubs(),
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
