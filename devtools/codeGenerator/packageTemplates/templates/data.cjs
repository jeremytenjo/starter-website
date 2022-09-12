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
      const schemaName = `${nameSinglePascal}Schema`

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      
      import type ${schemaName} from '../${nameSingle}.schema'
      
      import useCreate${pascalName} from './useCreate${pascalName}/useCreate${pascalName}'
      import useGet${pascalName} from './useGet${pascalName}/useGet${pascalName}'
      import useUpdate${pascalName} from './useUpdate${pascalName}/useUpdate${pascalName}'
      import useRemove${pascalName} from './useRemove${pascalName}/useRemove${pascalName}'
      
      export type Use${pascalName}Props = {
        getOptions?: UseDataProps<${schemaName}>['get']
        createOptions?: UseDataProps<${schemaName}>['create']
        updateOptions?: UseDataProps<${schemaName}>['update']
        removeOptions?: UseDataProps<${schemaName}>['remove']
      }
      
      export default function use${pascalName}(
        props: Use${pascalName}Props = {},
      ) {
        const get = useGet${pascalName}(props?.getOptions)
        const create = useCreate${pascalName}(props?.createOptions)
        const update = useUpdate${pascalName}(props?.updateOptions)
        const remove = useRemove${pascalName}(props?.removeOptions)
      
        const ${name} = useData<${schemaName}>({
          id: '${name}',
          get,
          create,
          update,
          remove
        })
      
        return ${name}
      }
      
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
      const schemaName = `${nameSinglePascal}Schema`

      return `
      // TODO add ${nameSinglePascal} Schema

      type ${schemaName} = any
      
      export default ${schemaName}
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
      const schemaName = `${nameSinglePascal}Schema`

      return `
      import type ${schemaName} from './${nameSingle}.schema'
          
      const ${pascalName}Stubs: ${schemaName}[] = [
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
      const schemaName = `${nameSinglePascal}Schema`
      const propsName = `Get${pascalName}Props`

      return `
import { type UseDataProps } from '@useweb/use-data'

import type ${schemaName} from '../../${nameSingle}.schema'

// fetcher
export type ${propsName} = any

export const get${pascalName} = async (props: ${propsName}) => {
  const ${name}: ${schemaName}[] = []

  return ${name}
}

// hook
type useGet${pascalName}Props = UseDataProps<${schemaName}>['get']
type useGet${pascalName}Return = UseDataProps<${schemaName}>['get']

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
      const schemaName = `${nameSinglePascal}Schema`
      const propsName = `Create${pascalName}Props`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

      import type ${schemaName} from '../../${nameSingle}.schema'

      export type ${propsName} = CreatorProps<${schemaName}>

      // creator
      export const create${pascalName} = async (props: ${propsName}) => {
        const newItem: ${schemaName} | undefined = undefined

        return { newItem }
      }
      
      // hook
      type useCreate${pascalName}Props = UseDataProps<${schemaName}>['create']
      type useCreate${pascalName}Return = UseDataProps<${schemaName}>['create']
      
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
      const schemaName = `${nameSinglePascal}Schema`
      const propsName = `Update${pascalName}Props`

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'

      import type ${schemaName} from '../../${nameSingle}.schema'

      export type ${propsName} = UpdaterProps<${schemaName}>
      
      // updater      
      export const update${pascalName} = async (props: ${propsName}) => {
        console.log(props)
      }
      
      // hook
      type useUpdate${pascalName}Props = UseDataProps<${schemaName}>['update']
      type useUpdate${pascalName}Return = UseDataProps<${schemaName}>['update']
      
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
      
      `
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
      const schemaName = `${nameSinglePascal}Schema`
      const propsName = `Remove${pascalName}Props`

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

      import type ${schemaName} from '../../${nameSingle}.schema'

      export type ${propsName} = RemoverProps<${schemaName}>
      
      // remover
      export const remove${pascalName} = async (props: ${propsName}) => {
        console.log(props)
      }
      
      // hook
      type useRemove${pascalName}Props = UseDataProps<${schemaName}>['remove']
      type useRemove${pascalName}Return = UseDataProps<${schemaName}>['remove']
      
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
      
`
    },
  },

  // // components - stories
  // {
  //   path: ({ name, helpers }) => {
  //     const pascalName = helpers.changeCase.pascalCase(name)
  //     return `components/stories/${pascalName}.stories.tsx`
  //   },
  //   template: ({ name, helpers }) => {
  //     const pascalName = helpers.changeCase.pascalCase(name)
  //     const nameSingle = pluralize.singular(name)
  //     const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

  //     return `import React from 'react'

  //     import ${pascalName}Stubs from '../../${name}.stubs'
  //     import ${nameSinglePascal}Component, { type ${nameSinglePascal}Props } from '../${nameSinglePascal}/${nameSinglePascal}'
  //     import ${pascalName}ListComponent, { type ${pascalName}ListProps } from '../${pascalName}List/${pascalName}List'

  //     export default {
  //       title: 'data/${pascalName}/components',
  //     }

  //     export const ${nameSinglePascal} = {
  //       args: {
  //         ${nameSingle}: ${pascalName}Stubs[0],
  //       } as ${nameSinglePascal}Props,

  //       render: (args) => {
  //         return <${nameSinglePascal}Component {...args} />
  //       },
  //     }

  //     export const ${pascalName}List  = {
  //       args: {} as ${pascalName}ListProps,

  //       render: (args) => {
  //         return <${pascalName}ListComponent {...args} />
  //       },
  //     }`
  //   },
  // },

  // // components - Single
  // {
  //   path: ({ name, helpers }) => {
  //     const nameSingle = pluralize.singular(name)
  //     const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

  //     return `components/${nameSinglePascal}/${nameSinglePascal}.tsx`
  //   },
  //   template: ({ name, helpers }) => {
  //     const nameSingle = pluralize.singular(name)
  //     const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

  //     return `import React from 'react'
  //     import Box from '@useweb/ui/Box'

  //     import type ${schemaName} from '../../${nameSingle}.schema'

  //     export type ${nameSinglePascal}Props = {
  //       ${nameSingle}: ${schemaName}
  //     }

  //     export default function ${nameSinglePascal}(props: ${nameSinglePascal}Props) {
  //       console.log(props)
  //       return <Wrapper>${nameSinglePascal}</Wrapper>
  //     }

  //     const Wrapper = ({ children }) => {
  //       return (
  //         <Box data-id='${nameSinglePascal}' sx={{}}>
  //           {children}
  //         </Box>
  //       )
  //     }`
  //   },
  // },

  // // components - List
  // {
  //   path: ({ name, helpers }) => {
  //     const pascalName = helpers.changeCase.pascalCase(name)

  //     return `components/${pascalName}List/${pascalName}List.tsx`
  //   },
  //   template: ({ name, helpers }) => {
  //     const pascalName = helpers.changeCase.pascalCase(name)
  //     const nameSingle = pluralize.singular(name)
  //     const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

  //     return `import React from 'react'
  //     import Box from '@useweb/ui/Box'
  //     import List from '@useweb/ui/List'

  //     import ${nameSinglePascal} from '../${nameSinglePascal}/${nameSinglePascal}'
  //     import use${pascalName} from '../../use${pascalName}/use${pascalName}'

  //     export type ${pascalName}ListProps = any

  //     export default function ${pascalName}List(props: ${pascalName}ListProps) {
  //       const ${name} = use${pascalName}()
  //       console.log(${name})

  //       return (
  //         <Wrapper>
  //           <List data={${name}.get.data} ListItemComponent={({ itemData }) => <${nameSinglePascal} {...itemData} />} />
  //         </Wrapper>
  //       )
  //     }

  //     const Wrapper = ({ children }) => {
  //       return (
  //         <Box data-id='${pascalName}List' sx={{}}>
  //           {children}
  //         </Box>
  //       )
  //     }
  //     `
  //   },
  // },
]

const template = {
  type: 'Data',
  files,
}

module.exports = {
  files,
  template,
}
