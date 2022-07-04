//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getPrismicData, { type GetPrismicDataProps } from '../getPrismicData'

import Docs from './getPrismicData.docs.mdx'

const defaultArgs: GetPrismicDataProps = {
  contentType: 'product',
}

export default {
  title: 'lib/integrations/prismic/getPrismicData',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args) => {
  const fn = async () => getPrismicData(args)

  return (
    <>
      <AsyncTester fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: GetPrismicDataProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
