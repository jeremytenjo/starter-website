// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // hook
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/use${capitalName}.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `import useData, { type UseDataProps, type UseDataReturn } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'
      
      import type ${capitalName}Schema from '../${name}.schema'
      
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
      type useGet${capitalName}ReturnUpdatedGet = Object.P.Update<
        UseDataReturn,
        ['get', 'data'],
        ${capitalName}Schema[]
      >
      
      type useGet${capitalName}ReturnUpdatedCreate = Object.P.Update<
        useGet${capitalName}ReturnUpdatedGet,
        ['create', 'exec'],
        (props: { value: ${capitalName}Schema }) => any
      >
      
      type useGet${capitalName}ReturnUpdatedUpdate = Object.P.Update<
        useGet${capitalName}ReturnUpdatedCreate,
        ['update', 'exec'],
        (props: { id: string | number; value: ${capitalName}Schema }) => any
      >
      
      type useGet${capitalName}Return = useGet${capitalName}ReturnUpdatedUpdate
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
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      // get
      import {
        get${capitalName},
        type Get${capitalName}Props,
      } from '../use${capitalName}/useGet${capitalName}/useGet${capitalName}'
      // create
      import {
        create${capitalName},
        type Create${capitalName}Props,
      } from '../use${capitalName}/useCreate${capitalName}/useCreate${capitalName}'
      // update
      import {
        update${capitalName},
        type Update${capitalName}Props,
      } from '../use${capitalName}/useUpdate${capitalName}/useUpdate${capitalName}'
      // remove
      import {
        remove${capitalName},
        type Remove${capitalName}Props,
      } from '../use${capitalName}/useRemove${capitalName}/useRemove${capitalName}'
      
      export default {
        title: 'data/${capitalName}',
      }
      
      export const Get${capitalName} = {
        render: () => {
          const payload: Get${capitalName}Props = {}
          const fn = async () => get${capitalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Create${capitalName} = {
        render: () => {
          const payload: Create${capitalName}Props = {}
          const fn = async () => create${capitalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Update${capitalName} = {
        render: () => {
          const payload: Update${capitalName}Props = {}
          const fn = async () => update${capitalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      export const Remove${capitalName} = {
        render: () => {
          const payload: Remove${capitalName}Props = {}
          const fn = async () => remove${capitalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      `
    },
  },

  // get
  {
    path: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useGet${capitalName}/useGet${capitalName}.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `
import { type UseDataProps } from '@useweb/use-data'

import type ${capitalName}Schema from '../../${name}.schema'

// fetcher
export type Get${capitalName}Props = any

export const get${capitalName} = async (props: Get${capitalName}Props) => {
  const ${name}: ${capitalName}Schema[] = []

  return ${name}
}

// hook
type useGet${capitalName}Props = UseDataProps['get']
type useGet${capitalName}Return = UseDataProps['get']

export default function useGet${capitalName}(
  props: useGet${capitalName}Props,
): useGet${capitalName}Return {

  const get: useGet${capitalName}Return = {
    fetcher: get${capitalName},

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
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useCreate${capitalName}/useCreate${capitalName}.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `
      import { type UseDataProps } from '@useweb/use-data'

      import type ${capitalName}Schema from '../../${name}.schema'
      
      // creator
      export type Create${capitalName}Props = any
      
      export const create${capitalName} = async (props: { value: Create${capitalName}Props }) => {
        const newItem: ${capitalName}Schema = {id: 'hello'}

        return { newItem }
      }
      
      // hook
      type useCreate${capitalName}Props = UseDataProps['create']
      type useCreate${capitalName}Return = UseDataProps['create']
      
      export default function useCreate${capitalName}(
        props: useCreate${capitalName}Props,
      ): useCreate${capitalName}Return {
        const create: useCreate${capitalName}Return = {
          creator: create${capitalName},
      
          onCreate: (result) => {
            props?.onCreate && props?.onCreate(result)
          },
      
          onCreateError: (error) => {      
            console.error('useCreate${capitalName} error')
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
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useUpdate${capitalName}/useUpdate${capitalName}.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `import { type UseDataProps } from '@useweb/use-data'

      import type ${capitalName}Schema from '../../${name}.schema'
      
      // updater
      export type Update${capitalName}Props = any
      
      export const update${capitalName} = async (props: {updatedItem: Update${capitalName}Props}) => {
        console.log(props)
      }
      
      // hook
      type useUpdate${capitalName}Props = UseDataProps['update']
      type useUpdate${capitalName}Return = UseDataProps['update']
      
      export default function useUpdate${capitalName}(
        props: useUpdate${capitalName}Props,
      ): useUpdate${capitalName}Return {
      
        const update: useUpdate${capitalName}Return = {
          updater: update${capitalName},
      
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
      const capitalName = helpers.changeCase.capitalCase(name)
      return `use${capitalName}/useRemove${capitalName}/useRemove${capitalName}.ts`
    },
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)

      return `import { type UseDataProps } from '@useweb/use-data'

      import type ${capitalName}Schema from '../../${name}.schema'
      
      // remover
      export type Remove${capitalName}Props = any
      
      export const remove${capitalName} = async (props: {removedItemId: Remove${capitalName}Props}) => {
        console.log(props)
      }
      
      // hook
      type useRemove${capitalName}Props = UseDataProps['remove']
      type useRemove${capitalName}Return = UseDataProps['remove']
      
      export default function useRemove${capitalName}(
        props: useRemove${capitalName}Props,
      ): useRemove${capitalName}Return {
      
        const remove: useRemove${capitalName}Return = {
          remover: remove${capitalName},
      
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
