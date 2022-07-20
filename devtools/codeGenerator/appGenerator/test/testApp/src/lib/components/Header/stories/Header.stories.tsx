//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import Header, { type HeaderProps } from '../Header'

import Docs from './Header.docs'

const defaultArgs: HeaderProps = {
  name: 'Header',
}

export default {
  title: 'lib/components/Header',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: HeaderProps) => {
  return (
    <>
      <Header {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: HeaderProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
