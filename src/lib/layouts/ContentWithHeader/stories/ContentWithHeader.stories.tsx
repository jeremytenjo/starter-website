//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContentWithHeader, { type ContentWithHeaderProps } from '../ContentWithHeader'

const defaultArgs: ContentWithHeaderProps = {
  title: 'ContentWithHeader',
  content: 'content',
}

export default {
  title: 'lib/layouts/ContentWithHeader',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ContentWithHeaderProps) => {
  return (
    <>
      <ContentWithHeader {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContentWithHeaderProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
