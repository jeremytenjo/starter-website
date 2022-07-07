const dataPrismic = require('./dataPrismic.cjs')

const files = [
  {
    path: ({ name }) => `${name}.schema.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      // TODO add ${upperName} schema
      type ${upperName}Schema = {
        id: string
      }
      
      export default ${upperName}Schema

      `
    },
  },
  {
    path: ({ name }) => `${name}.stubs.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

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
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      const fnName = `get${upperName}`

      return `${name}.api/${fnName}/${fnName}.tsx`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      import ${name}Stubs from '../../${name}.stubs'
      import type ${upperName}Schema from '../../${name}.schema'
      import getData from '../../../../lib/utils/data/getData/getData'
      
      export default async function get${upperName}() {
        const getFn = () => get${upperName}FromApi()

        const ${name}: ${upperName}Schema[] = await getData({
          stubs: ${name}Stubs,
          getFn,
        })
      
        return ${name}
      }
      
      const get${upperName}FromApi = async () => {
        const ${name}: ${upperName}Schema[] = []
        // TODO get ${name} from api
      
        return ${name}
      }
      

      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      const fnName = `get${upperName}`

      return `${name}.api/${fnName}/stories/${fnName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

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
