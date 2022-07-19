//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import SiteLogo, { type SiteLogoProps } from '../SiteLogo'

import Docs from './SiteLogo.docs'

const defaultArgs: SiteLogoProps = {
  name: 'SiteLogo',
}

export default {
  title: 'lib/components/SiteLogo',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: SiteLogoProps) => {
  return (
    <>
      <SiteLogo {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: SiteLogoProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
