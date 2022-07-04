// https://storybook.js.org/docs/react/api/argtypes
import React from 'react'
import AsyncTester, { type AsyncTesterProps } from '@useweb/async-tester'

import getBlogs from './blogs.api/getBlogs'

export default {
  title: 'api/blogs/prismic',
  args: {
    autoExec: true,
  },
}

const Template = (args) => {
  return <AsyncTester {...args} />
}

// Blogs
export const Blogs = Template.bind({}) as any

const BlogsArgs: AsyncTesterProps = {
  fn: getBlogs,
}

Blogs.args = BlogsArgs
