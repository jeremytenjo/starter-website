//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import addSlugToData, { type AddSlugToDataProps } from '../addSlugToData'
// import BlogsStubs from '../../../../../../data/blogs/blogs.api/blogs.stubs'

const defaultArgs: AddSlugToDataProps = {
  data: [],
  slugKey: 'title',
}

export default {
  title: 'lib/integrations/prismic/utils/addSlugToData',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: AddSlugToDataProps) => {
  const fn = async () => addSlugToData(args)

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

// const variantArgs: AddSlugToDataProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
