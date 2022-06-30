//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import GoogleAdUnit, { type GoogleAdUnitProps } from '@useweb/ui/GoogleAdUnit'

import Docs from './GoogleAdUnit.docs.mdx'

const defaultArgs: GoogleAdUnitProps = {
  isProd: false,
  dataAdClient: '',
  dataAdFormat: '',
  dataAdLayout: '',
  dataAdSlot: '',
}

export default {
  title: 'lib/components/ads/GoogleAdUnit',
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
      <GoogleAdUnit {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: GoogleAdUnitProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
