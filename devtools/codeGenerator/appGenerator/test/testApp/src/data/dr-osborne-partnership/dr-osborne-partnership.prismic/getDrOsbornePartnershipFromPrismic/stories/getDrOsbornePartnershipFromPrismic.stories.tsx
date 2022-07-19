//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getDrOsbornePartnershipFromPrismic, {
  type GetDrOsbornePartnershipFromPrismicProps,
} from '../getDrOsbornePartnershipFromPrismic'

import Docs from './getDrOsbornePartnershipFromPrismic.docs'

const defaultArgs: GetDrOsbornePartnershipFromPrismicProps = {
  name: 'getDrOsbornePartnershipFromPrismic',
}

export default {
  title: 'data/dr-osborne-partnership/prismic/getDrOsbornePartnershipFromPrismic',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: GetDrOsbornePartnershipFromPrismicProps) => {
  const fn = async () => getDrOsbornePartnershipFromPrismic(args)

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

// const variantArgs: GetDrOsbornePartnershipFromPrismicProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
