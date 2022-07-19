const dataPrismic = require('./dataPrismic.cjs')

const files = [
  {
    path: ({ name }) => `${name}.schema.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')

      return `import type ${upperName}PrismicSchema from './${name}.prismic/${name}.prismic.schema'

      
      // TODO add ${upperName} schema
      type ${upperName}Schema = ${upperName}PrismicSchema
      
      export default ${upperName}Schema

      `
    },
  },
  {
    path: ({ name }) => `${name}.stubs.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')

      return `
      import type ${upperName}Schema from './${name}.schema'

      const ${upperName}Stubs: ${upperName}Schema[] = [
        // TODO add ${upperName} stubs
      ]
      
      export default ${upperName}Stubs

      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')
      const fnName = `get${upperName}`

      return `${name}.api/${fnName}/${fnName}.tsx`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')

      const cleanName = helpers.changeCase.camelCase(upperName)

      return `
      import ${cleanName}Stubs from '../../${cleanName}.stubs'
      import type ${upperName}Schema from '../../${cleanName}.schema'
      import getData from '../../../../lib/utils/data/getData/getData'
      
      export default async function get${upperName}({ previewData = {} } = {}) {
        const getFn = () => get${upperName}FromApi({previewData})

        const ${cleanName}: ${upperName}Schema[] = await getData({
          stubs: ${cleanName}Stubs,
          getFn,
        })
      
        return ${cleanName}
      }
      
      const get${upperName}FromApi = async ({previewData}) => {
        const ${cleanName}: ${upperName}Schema[] = []
        // TODO get ${cleanName} from api
      
        return ${cleanName}
      }
      

      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')
      const fnName = `get${upperName}`

      return `${name}.api/${fnName}/stories/${fnName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase
        .pascalCase(name)
        .split('-')
        .join('')
        .replaceAll(' ', '')

      return `// https://storybook.js.org/docs/react/api/argtypes
      import React from 'react'
      import AsyncTester, {
        type AsyncTesterProps,
      } from '@useweb/async-tester'
      
      import get${upperName} from '../get${upperName}'
      
      export default {
        title: 'data/${name}',
        args: {
          autoExec: true,
        },
      }
      
      const Template = (args) => {
        return <AsyncTester {...args} />
      }

      // ${upperName}
      export const ${upperName}Data = Template.bind({}) as any

      const ${upperName}Args: AsyncTesterProps = {
        fn: get${upperName},
      }

      ${upperName}Data.args = ${upperName}Args
      `
    },
  },
  ...dataPrismic.files,
]

const template = {
  type: 'Data',
  files,
}

module.exports = {
  files,
  template,
}
