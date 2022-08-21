const pluralize = require('pluralize')

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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import useData, { type UseDataProps, type UseDataReturn } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'
      
      import type ${nameSinglePascal}Schema from '../${nameSingle}.schema'
      
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
        ${nameSinglePascal}Schema[]
      >
      
      type useGet${pascalName}ReturnUpdatedCreate = Object.P.Update<
        useGet${pascalName}ReturnUpdatedGet,
        ['create', 'exec'],
        (props: { value: ${nameSinglePascal}Schema }) => any
      >
      
      type useGet${pascalName}ReturnUpdatedUpdate = Object.P.Update<
        useGet${pascalName}ReturnUpdatedCreate,
        ['update', 'exec'],
        (props: { id: string | number; value: ${nameSinglePascal}Schema }) => any
      >
      
      type useGet${pascalName}Return = useGet${pascalName}ReturnUpdatedUpdate
      `
    },
  },

  // schema
  {
    path: ({ name }) => {
      const nameSingle = pluralize.singular(name)
      return `${nameSingle}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `
      // TODO add ${nameSinglePascal} Schema

      type ${nameSinglePascal}Schema = any
      
      export default ${nameSinglePascal}Schema
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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `
      import type ${nameSinglePascal}Schema from './${nameSingle}.schema'
          
      const ${pascalName}Stubs: ${nameSinglePascal}Schema[] = [
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
      
      // export const Create${pascalName} = {
      //   render: () => {
      //     const payload: Create${pascalName}Props = {}
      //     const fn = async () => create${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Update${pascalName} = {
      //   render: () => {
      //     const payload: Update${pascalName}Props = {}
      //     const fn = async () => update${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Remove${pascalName} = {
      //   render: () => {
      //     const payload: Remove${pascalName}Props = {}
      //     const fn = async () => remove${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `
import { type UseDataProps } from '@useweb/use-data'

import type ${nameSinglePascal}Schema from '../../${nameSingle}.schema'

// fetcher
export type Get${pascalName}Props = any

export const get${pascalName} = async (props: Get${pascalName}Props) => {
  const ${name}: ${nameSinglePascal}Schema[] = []

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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'

      import type ${nameSinglePascal}Schema from '../../${nameSingle}.schema'
      
      // creator
      export type Create${pascalName}Props = Object.P.Update<
      CreatorProps,
      ['value'],
      ${nameSinglePascal}Schema
    >
      
      export const create${pascalName} = async (props: Create${pascalName}Props) => {
        const newItem: ${nameSinglePascal}Schema | undefined = undefined

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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'

      import type ${nameSinglePascal}Schema from '../../${nameSingle}.schema'
      
      // updater      
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
      }
      
      // types 
      type Update${pascalName}Props1 = Object.P.Update<
        UpdaterProps,
        ['updatedItem'],
        ${nameSinglePascal}Schema
      >
      
      export type Update${pascalName}Props = Object.P.Update<
        Update${pascalName}Props1,
        ['latestData'],
        ${nameSinglePascal}Schema[]
      >`
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
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'
      import { Object } from 'ts-toolbelt'

      import type ${nameSinglePascal}Schema from '../../${nameSingle}.schema'
      
      // remover
      export const remove${pascalName} = async (props: Remove${pascalName}Props) => {
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
      }
      
      // types
      type Remove${pascalName}Props1 = Object.P.Update<
        RemoverProps,
        ['latestData'],
        ${nameSinglePascal}Schema[]
      >
          
      export type Remove${pascalName}Props = Remove${pascalName}Props1 | undefined
`
    },
  },

  // components - stories
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `components/stories/${pascalName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'

      import ${pascalName}Stubs from '../../${name}.stubs'
      import ${nameSinglePascal}Component, { type ${nameSinglePascal}Props } from '../${nameSinglePascal}/${nameSinglePascal}'
      import ${pascalName}ListComponent, { type ${pascalName}ListProps } from '../${pascalName}List/${pascalName}List'

      export default {
        title: 'data/${pascalName}/components',
      }

      export const ${nameSinglePascal} = {
        args: {
          ${nameSingle}: ${pascalName}Stubs[0],
        } as ${nameSinglePascal}Props,
      
        render: (args) => {
          return <${nameSinglePascal}Component {...args} />
        },
      }

      export const ${pascalName}List  = {
        args: {} as ${pascalName}ListProps,
      
        render: (args) => {
          return <${pascalName}ListComponent {...args} />
        },
      }`
    },
  },

  // components - Single
  {
    path: ({ name, helpers }) => {
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `components/${nameSinglePascal}/${nameSinglePascal}.tsx`
    },
    template: ({ name, helpers }) => {
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      
      import type ${nameSinglePascal}Schema from '../../${nameSingle}.schema'
      
      export type ${nameSinglePascal}Props = {
        ${nameSingle}: ${nameSinglePascal}Schema
      }
      
      export default function ${nameSinglePascal}(props: ${nameSinglePascal}Props) {
        console.log(props)
        return <Wrapper>${nameSinglePascal}</Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${nameSinglePascal}' sx={{}}>
            {children}
          </Box>
        )
      }`
    },
  },

  // components - List
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `components/${pascalName}List/${pascalName}List.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      
      import ${nameSinglePascal} from '../${nameSinglePascal}/${nameSinglePascal}'
      import use${pascalName} from '../../use${pascalName}/use${pascalName}'
      
      export type ${pascalName}ListProps = any
      
      export default function ${pascalName}List(props: ${pascalName}ListProps) {
        const ${name} = use${pascalName}()
        console.log(${name})
      
        return (
          <Wrapper>
            <List data={${name}.get.data} ListItemComponent={({ itemData }) => <${nameSinglePascal} {...itemData} />} />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}List' sx={{}}>
            {children}
          </Box>
        )
      }
      `
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
