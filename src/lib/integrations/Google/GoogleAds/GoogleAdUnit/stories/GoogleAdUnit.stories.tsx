//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import GoogleAdUnit, { type GoogleAdUnitProps } from '../GoogleAdUnit'

import Docs from './GoogleAdUnit.docs.mdx'

const defaultArgs: GoogleAdUnitProps = {
  dataAdFormat: '',
  dataAdLayoutKey: '',
  dataAdSlot: '',
}

export default {
  title: 'lib/components/integrations/google/googleAds/GoogleAdUnit',
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
