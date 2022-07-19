//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getSettingsFromPrismic, {
  type GetSettingsFromPrismicProps,
} from '../getSettingsFromPrismic'

import Docs from './getSettingsFromPrismic.docs'

const defaultArgs: GetSettingsFromPrismicProps = {
  name: 'getSettingsFromPrismic',
}

export default {
  title: 'data/settings/prismic/getSettingsFromPrismic',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: GetSettingsFromPrismicProps) => {
  const fn = async () => getSettingsFromPrismic(args)

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

// const variantArgs: GetSettingsFromPrismicProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
