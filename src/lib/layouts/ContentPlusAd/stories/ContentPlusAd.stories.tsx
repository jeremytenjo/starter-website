//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContentPlusAd, { type ContentPlusAdProps } from '../ContentPlusAd'

const defaultArgs: ContentPlusAdProps = {
  children: 'Hello',
}

export default {
  title: 'lib/layouts/ContentPlusAd',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: ContentPlusAdProps) => {
  return (
    <>
      <ContentPlusAd {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContentPlusAdProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
