// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/use${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import useData, { type UseDataProps, type UseDataReturn } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'
      
      import type ${pascalName}Schema from '../${name}.schema'
      
      import useCreate${pascalName} from './useCreate${pascalName}/useCreate${pascalName}'
      import useGet${pascalName} from './useGet${pascalName}/useGet${pascalName}'
      import useUpdate${pascalName} from './useUpdate${pascalName}/useUpdate${pascalName}'
      import useRemove${pascalName} from './useRemove${pascalName}/useRemove${pascalName}'
      
      export type Use${pascalName}Props = {
        getOptions?: UseDataProps['get']
        createOptions?: UseDataProps['create']
        updateOptions?: UseDataProps['update']
        removeOptions?: UseDataProps['remove']
      }
      
      export default function use${pascalName}(
        props: Use${pascalName}Props = {},
      ): useGet${pascalName}Return {
        const get = useGet${pascalName}(props?.getOptions)
        const create = useCreate${pascalName}(props?.createOptions)
        const update = useUpdate${pascalName}(props?.updateOptions)
        const remove = useRemove${pascalName}(props?.removeOptions)
      
        const ${name} = useData({
          id: '${name}',
          get,
          create,
          update,
          remove
        })
      
        return ${name}
      }
      
      // return types
      type useGet${pascalName}ReturnUpdatedGet = Object.P.Update<
        UseDataReturn,
        ['get', 'data'],
        ${pascalName}Schema[]
      >
      
      type useGet${pascalName}ReturnUpdatedCreate = Object.P.Update<
        useGet${pascalName}ReturnUpdatedGet,
        ['create', 'exec'],
        (props: { value: ${pascalName}Schema }) => any
      >
      
      type useGet${pascalName}ReturnUpdatedUpdate = Object.P.Update<
        useGet${pascalName}ReturnUpdatedCreate,
        ['update', 'exec'],
        (props: { id: string | number; value: ${pascalName}Schema }) => any
      >
      
      type useGet${pascalName}Return = useGet${pascalName}ReturnUpdatedUpdate
      `
    },
  },

  // schema
  {
    path: ({ name }) => {
      return `${name}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
      // TODO add ${pascalName} Schema

      type ${pascalName}Schema = any
      
      export default ${pascalName}Schema
      `
    },
  },

  // stubs
  {
    path: ({ name }) => {
      return `${name}.stubs.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
      import type ${pascalName}Schema from './${name}.schema'
          
      const ${pascalName}Stubs: ${pascalName}Schema[] = [
        // TODO add ${pascalName} stubs
      ]
      
      export default ${pascalName}Stubs
`
    },
  },

  // stories
  {
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      // get
      import {
        get${pascalName},
        type Get${pascalName}Props,
      } from '../use${pascalName}/useGet${pascalName}/useGet${pascalName}'
      // create
      import {
        create${pascalName},
        type Create${pascalName}Props,
      } from '../use${pascalName}/useCreate${pascalName}/useCreate${pascalName}'
      // update
      import {
        update${pascalName},
        type Update${pascalName}Props,
      } from '../use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}'
      // remove
      import {
        remove${pascalName},
        type Remove${pascalName}Props,
      } from '../use${pascalName}/useRemove${pascalName}/useRemove${pascalName}'
      
      export default {
        title: 'data/${pascalName}',
      }
      
      export const Get${pascalName} = {
        render: () => {
          const payload: Get${pascalName}Props = {}
          const fn = async () => get${pascalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Create${pascalName} = {
        render: () => {
          const payload: Create${pascalName}Props = {}
          const fn = async () => create${pascalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Update${pascalName} = {
        render: () => {
          const payload: Update${pascalName}Props = {}
          const fn = async () => update${pascalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Remove${pascalName} = {
        render: () => {
          const payload: Remove${pascalName}Props = {}
          const fn = async () => remove${pascalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      `
    },
  },

  // get
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/useGet${pascalName}/useGet${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
import { type UseDataProps } from '@useweb/use-data'

import type ${pascalName}Schema from '../../${name}.schema'

// fetcher
export type Get${pascalName}Props = any

export const get${pascalName} = async (props: Get${pascalName}Props) => {
  const ${name}: ${pascalName}Schema[] = []

  return ${name}
}

// hook
type useGet${pascalName}Props = UseDataProps['get']
type useGet${pascalName}Return = UseDataProps['get']

export default function useGet${pascalName}(
  props: useGet${pascalName}Props,
): useGet${pascalName}Return {

  const get: useGet${pascalName}Return = {
    fetcher: get${pascalName},

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
`
    },
  },

  // create
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/useCreate${pascalName}/useCreate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'

      import type ${pascalName}Schema from '../../${name}.schema'
      
      // creator
      export type Create${pascalName}Props = Object.P.Update<
      CreatorProps,
      ['value'],
      ${pascalName}Schema
    >
      
      export const create${pascalName} = async (props: Create${pascalName}Props) => {
        const newItem: ${pascalName}Schema = {id: 'hello'}

        return { newItem }
      }
      
      // hook
      type useCreate${pascalName}Props = UseDataProps['create']
      type useCreate${pascalName}Return = UseDataProps['create']
      
      export default function useCreate${pascalName}(
        props: useCreate${pascalName}Props,
      ): useCreate${pascalName}Return {
        const create: useCreate${pascalName}Return = {
          creator: create${pascalName},
      
          onCreate: (result) => {
            props?.onCreate && props?.onCreate(result)
          },
      
          onCreateError: (error) => {      
            console.error('useCreate${pascalName} error')
            console.error(error)
            props?.onCreateError && props?.onCreateError(error)

          },
        }
      
        return create
      }
      `
    },
  },

  // update
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'

      import type ${pascalName}Schema from '../../${name}.schema'
      
      // updater
      export type Update${pascalName}Props = Object.P.Update<
        UpdaterProps,
        ['updatedItem'],
        ${pascalName}Schema
      >
      
      export const update${pascalName} = async (props: Update${pascalName}Props) => {
        console.log(props)
      }
      
      // hook
      type useUpdate${pascalName}Props = UseDataProps['update']
      type useUpdate${pascalName}Return = UseDataProps['update']
      
      export default function useUpdate${pascalName}(
        props: useUpdate${pascalName}Props,
      ): useUpdate${pascalName}Return {
      
        const update: useUpdate${pascalName}Return = {
          updater: update${pascalName},
      
          onUpdate: (result) => {
            props?.onUpdate && props.onUpdate(result)
          },
      
          onUpdateError: (error) => {
            props?.onUpdateError && props.onUpdateError(error)
          },
        }
      
        return update
      }`
    },
  },

  // remove
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/useRemove${pascalName}/useRemove${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import { type UseDataProps } from '@useweb/use-data'

      import type ${pascalName}Schema from '../../${name}.schema'
      
      // remover
      export type Remove${pascalName}Props = any
      
      export const remove${pascalName} = async (props: {removedItemId: Remove${pascalName}Props}) => {
        console.log(props)
      }
      
      // hook
      type useRemove${pascalName}Props = UseDataProps['remove']
      type useRemove${pascalName}Return = UseDataProps['remove']
      
      export default function useRemove${pascalName}(
        props: useRemove${pascalName}Props,
      ): useRemove${pascalName}Return {
      
        const remove: useRemove${pascalName}Return = {
          remover: remove${pascalName},
      
          onRemove: (result) => {
            props?.onRemove && props.onRemove(result)
          },
      
          onRemoveError: (error) => {
            props?.onRemoveError && props.onRemoveError(error)
          },
        }
      
        return remove
      }`
    },
  },
]

const template = {
  type: 'Data',
  files,
}

module.exports = {
  files,
  template,
}
