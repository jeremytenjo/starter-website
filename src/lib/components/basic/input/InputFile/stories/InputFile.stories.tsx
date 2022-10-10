//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import InputFile, { type InputFileProps } from '../InputFile'

import Docs from './InputFile.docs'

const defaultArgs: InputFileProps = {
  onChange({ file }) {
    console.log(file)
  },
}

export default {
  title: 'lib/components/basic/input/InputFile',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: InputFileProps) => {
  return (
    <>
      <InputFile {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: InputFileProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
