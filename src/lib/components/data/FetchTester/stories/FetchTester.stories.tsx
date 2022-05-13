//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import FetchTester, { type FetchTesterProps } from '../FetchTester'

import Docs from './FetchTester.docs.mdx'

export default {
  title: 'lib/components/FetchTester',
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
      <FetchTester {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: FetchTesterProps = {
  url: 'http://localhost:3000/api/example',
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: FetchTesterProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
