//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getHomepageFromPrismic, {
  type GetHomepageFromPrismicProps,
} from '../getHomepageFromPrismic'

import Docs from './getHomepageFromPrismic.docs'

const defaultArgs: GetHomepageFromPrismicProps = {
  name: 'getHomepageFromPrismic',
}

export default {
  title: 'data/homepage/prismic/getHomepageFromPrismic',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: GetHomepageFromPrismicProps) => {
  const fn = async () => getHomepageFromPrismic(args)

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

// const variantArgs: GetHomepageFromPrismicProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
