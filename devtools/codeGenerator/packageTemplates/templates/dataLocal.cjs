// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // hook
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/use${capitalName}.ts}`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `import useData, { type UseDataProps, type UseDataReturn } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'
      
      import type ${capitalName}Schema from '../streamLinks.schema'
      
      import useCreate${capitalName} from './useCreate${capitalName}/useCreate${capitalName}'
      import useGet${capitalName} from './useGet${capitalName}/useGet${capitalName}'
      import useUpdate${capitalName} from './useUpdate${capitalName}/useUpdate${capitalName}'
      import useRemove${capitalName} from './useRemove${capitalName}/useRemove${capitalName}'
      
      export type Use${capitalName}Props = {
        getOptions?: UseDataProps['get']
        createOptions?: UseDataProps['create']
        updateOptions?: UseDataProps['update']
        removeOptions?: UseDataProps['remove']
      }
      
      export default function use${capitalName}(
        props: Use${capitalName}Props = {},
      ): useGet${capitalName}Return {
        const get = useGet${capitalName}(props?.getOptions)
        const create = useCreate${capitalName}(props?.createOptions)
        const update = useUpdate${capitalName}(props?.updateOptions)
        const remove = useRemove${capitalName}(props?.removeOptions)
      
        const streamLinks = useData({
          id: '${name}',
          get,
          create,
          update,
          remove
        })
      
        return streamLinks
      }
      
      // return types
      type useGet${capitalName}ReturnUpdateGet = Object.P.Update<
        UseDataReturn,
        ['get', 'data'],
        ${capitalName}Schema[]
      >
      
      type useGet${capitalName}ReturnUpdateCreate = Object.P.Update<
        useGet${capitalName}ReturnUpdateGet,
        ['create', 'exec'],
        (props: { value: ${capitalName}Schema }) => any
      >
      
      type useGet${capitalName}ReturnUpdateUpdate = Object.P.Update<
        useGet${capitalName}ReturnUpdateCreate,
        ['update', 'exec'],
        (props: { id: string | number; value: ${capitalName}Schema }) => any
      >
      
      type useGet${capitalName}Return = useGet${capitalName}ReturnUpdateUpdate
      `
    },
  },

  // schema
  {
    path: ({ name }) => {
      return `${name}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `
      // TODO add ${capitalName} Schema

      type ${capitalName}Schema = any
      
      export default ${capitalName}Schema
      `
    },
  },

  // stubs
  {
    path: ({ name }) => {
      return `${name}.stubs.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `
      import type ${capitalName}Schema from './${name}.schema'
          
      const ${capitalName}Stubs: ${capitalName}Schema[] = [
        // TODO add ${capitalName} stubs
      ]
      
      export default ${capitalName}Stubs
`
    },
  },

  // stories
  {
    path: ({ name, helpers }) => {
      return `${name}.ts`
    },
    template: ({ name, helpers }) => {
      return `${name}.ts`
    },
  },

  // get
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useGet${capitalName}.ts}`
    },
    template: ({ name, helpers }) => {
      return `${name}.ts`
    },
  },

  // create
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useCreate${capitalName}.ts}`
    },
    template: ({ name, helpers }) => {
      return `${name}.ts`
    },
  },

  // update
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useUpdate${capitalName}.ts}`
    },
    template: ({ name, helpers }) => {
      return `${name}.ts`
    },
  },

  // remove
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useRemove${capitalName}.ts}`
    },
    template: ({ name, helpers }) => {
      return `${name}.ts`
    },
  },
]

const template = {
  type: 'Data Local',
  files,
}

module.exports = {
  files,
  template,
}
