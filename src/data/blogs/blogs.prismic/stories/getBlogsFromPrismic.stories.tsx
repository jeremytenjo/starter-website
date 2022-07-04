//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getBlogsFromPrismic, { type GetBlogsFromPrismicProps } from '../getBlogs.prismic'

import Docs from './getBlogsFromPrismic.docs.mdx'

const defaultArgs: GetBlogsFromPrismicProps = {
  name: 'getBlogsFromPrismic',
}

export default {
  title: 'data/blogs/blogs.prismic/getBlogsFromPrismic',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: GetBlogsFromPrismicProps) => {
  const fn = async () => getBlogsFromPrismic(args)

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

// const variantArgs: GetBlogsFromPrismicProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
