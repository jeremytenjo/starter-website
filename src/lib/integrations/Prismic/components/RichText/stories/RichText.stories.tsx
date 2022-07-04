//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import useAsync from '@useweb/use-async'

import RichText, { type RichTextProps } from '../RichText'
import getBlogs from '../../../../../../data/blogs/blogs.prismic/getBlogs.prismic'

import Docs from './RichText.docs.mdx'

const defaultArgs: RichTextProps = {
  field: [
    {
      type: 'heading1',
      text: 'Top Tech Products 2022\n\n',
      spans: [],
    },
  ],
}

export default {
  title: 'lib/integrations/prismic/components/RichText',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args) => {
  const blogs = useAsync({
    fn: getBlogs,
    autoExec: true,
  })
  const field = blogs.result?.[0]?.data?.content

  return (
    <>
      {blogs.loading && <div>Loading blog from prismic...</div>}

      {blogs.result && <RichText {...args} field={field} />}
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: RichTextProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
