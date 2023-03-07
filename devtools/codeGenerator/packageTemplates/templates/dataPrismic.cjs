// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => {
      return `${name}.prismic/${name}.prismic.schema.ts`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      // TODO add ${upperName} schema
      type ${upperName}PrismicSchema = {
        id: string
      }
      
      export default ${upperName}PrismicSchema
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const capCase = `${helpers.changeCase.pascalCase(name)}`
      const getFunction = `get${capCase}FromPrismic`

      return `${name}.prismic/${getFunction}/${getFunction}.ts`
    },
    template: ({ name, helpers }) => {
      const cleanName = helpers.changeCase.camelCase(name).replaceAll(' ', '')
      const capCase = `${helpers.changeCase.pascalCase(name)}`
      const getFunction = `get${capCase}FromPrismic`
      const typeName = helpers.changeCase.paramCase(name)
      const schema = `${capCase}PrismicSchema`
      const getFunctionCap = helpers.changeCase.pascalCase(getFunction)
      const propName = `${getFunctionCap}Props`

      return `import prismicClient from '../../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
      import type ${schema} from '../${name}.prismic.schema'
      import addSlugToData from '../../../../lib/integrations/Prismic/utils/addSlugToData/addSlugToData'

      export type ${propName} = any
      
      export default async function ${getFunction}({ previewData = {} }: ${propName} = {}) {
        const ${cleanName}: ${schema}[] = (await prismicClient({
          previewData,
        }).getAllByType('${typeName}')) as ${schema}[]

        const ${cleanName}WithSlug = addSlugToData({ data: ${cleanName}, slugKey: 'title' })
      
        return ${cleanName}WithSlug
      }
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const capCase = `${helpers.changeCase.pascalCase(name)}`
      const getFunction = `get${capCase}FromPrismic`

      return `${name}.prismic/${getFunction}/stories/${getFunction}.docs.tsx`
    },
    template: ({ name, helpers }) => {
      return `import React from 'react'
      import {
        Title,
        Description,
        Primary,
        ArgsTable,
        PRIMARY_STORY,
      } from '@storybook/addon-docs'
      
      // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
      export default function Docs() {
        return (
          <>
            <Title />
            <Description>This is a ${helpers.changeCase.pascalCase(name)}</Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
          </>
        )
      }`
    },
  },
  {
    path: ({ name, helpers }) => {
      const capCase = `${helpers.changeCase.pascalCase(name)}`
      const getFunction = `get${capCase}FromPrismic`

      return `${name}.prismic/${getFunction}/stories/${getFunction}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const capCase = `${helpers.changeCase.pascalCase(name)}`
      const getFunction = `get${capCase}FromPrismic`
      const getFunctionCap = helpers.changeCase.pascalCase(getFunction)
      const propName = `${getFunctionCap}Props`

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import ${getFunction}, {
        type ${propName},
      } from '../${getFunction}'
      
      const defaultArgs: ${propName} = {
        name: '${getFunction}',
      }
      
      export default {
        title: 'data/${name}/prismic/${getFunction}',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = (args: ${propName}) => {
        const fn = async () => ${getFunction}(args)
      
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
      
      // const variantArgs: ${propName} = {
      //  name: 'World',
      // }
      
      // export const Variant = {
      //  ...Default,
      //  args: variantArgs
      // }
      `
    },
  },
]

const template = {
  type: 'Prismic Data',
  files,
}

module.exports = {
  files,
  template,
}
