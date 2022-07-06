//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import CodeBlock from '../../../../../components/basic/misc/CodeBlock/CodeBlock'
import capitalizeFirstLetter from '../../../../../utils/strings/capitalizeFirstLetter/capitalizeFirstLetter'
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

const Template = (args: GetPrismicDataProps) => {
  const fn = async () => getPrismicData(args)
  const upperCase = capitalizeFirstLetter({ string: args.contentType })

  const code = `import prismicClient from '../../../lib/utils/prismic/prismicClient/prismicClient'
import type ${upperCase}Schema from '../${args.contentType}.schema'
  
export default async function get${upperCase}s({ previewData = {} } = {}) {
  const ${args.contentType}Categories: ${upperCase}Schema[] = (await prismicClient({
    previewData,
  }).getAllByType('${args.contentType}')) as ${upperCase}Schema[]

  return ${args.contentType}Categories
}`

  return (
    <>
      <CodeBlock code={code} />
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
