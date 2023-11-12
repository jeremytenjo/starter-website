const pluralize = require('pluralize')
const changeCase = require('change-case')

const { getStoryPrefix } = require('./story.cjs')

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

const splitCamelCase = (string) => {
  return string.split(/(?=[A-Z])/).map((s) => s.toLowerCase())[0]
}

const getSchemaName = (rawName) => {
  const schemaName = pluralize.singular(changeCase.pascalCase(splitCamelCase(rawName)))
  return `${schemaName}Schema`
}

const getSchemaImportName = (name) => {
  const nameSingle = changeCase.pascalCase(pluralize.singular(name))
  return `${lowercaseFirstLetter(nameSingle)}.schema`
}

const getStubsName = (name) => {
  const camelCase = changeCase.camelCase(name)
  return `${camelCase}.stubs`
}

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // schema
  {
    path: ({ name }) => {
      return `${getSchemaImportName(name)}.ts`
    },
    template: ({ name, helpers }) => {
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `
      // TODO add ${nameSinglePascal} Schema

      type ${schemaName} = {
        id: string 
        name: string
      }
      
      export default ${schemaName}
      `
    },
  },

  // stubs
  {
    path: ({ name }) => {
      return `${getStubsName(name)}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `
      import type ${schemaName} from './${lowercaseFirstLetter(nameSingle)}.schema'
          
      const ${camelCase}Stubs: ${schemaName}[] = [
        // TODO add ${camelCase} stubs
        {
          id: '1',
          name: '${camelCase}'
        }
      ]
      
      export default ${camelCase}Stubs
`
    },
  },
  // hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/use${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)
      const schemaName = getSchemaName(name)
      const getpropsName = `Get${pascalName}Props`

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      
      import type ${schemaName} from '../${getSchemaImportName(name)}'
      
      import useGet${pascalName}, { type ${getpropsName} } from './useGet${pascalName}/useGet${pascalName}'
      import useCreate${pascalName} from './useCreate${pascalName}/useCreate${pascalName}'
      import useUpdate${pascalName} from './useUpdate${pascalName}/useUpdate${pascalName}'
      import useRemove${pascalName} from './useRemove${pascalName}/useRemove${pascalName}'
      
      export type Use${pascalName}Props = {
        getOptions?: UseDataProps<${schemaName}, ${getpropsName}>['get']
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
      
        const ${camelCase} = useData<${schemaName}, ${getpropsName}>({
          id: '${camelCase}',
          get,
          create,
          update,
          remove
        })
      
        return ${camelCase}
      }
      
      `
    },
  },

  // stories
  {
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath })

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      // get
      import {
        get${pascalName},
        type Get${pascalName}Props,
      } from '../use${pascalName}/useGet${pascalName}/useGet${pascalName}'
      // create
      // import {
      //   create${pascalName},
      //   type Create${pascalName}Props,
      // } from '../use${pascalName}/useCreate${pascalName}/useCreate${pascalName}'
      // update
      // import {
      //   update${pascalName},
      //   type Update${pascalName}Props,
      // } from '../use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}'
      // remove
      // import {
      //   remove${pascalName},
      //   type Remove${pascalName}Props,
      // } from '../use${pascalName}/useRemove${pascalName}/useRemove${pascalName}'
      
      export default {
        title: '${storyPrefix}/${pascalName}',
        parameters: {
          signInAs: false,
        },
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
      const schemaName = getSchemaName(name)
      const propsName = `Get${pascalName}Props`

      return `
import { type UseDataProps } from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'

import type ${schemaName} from '../../${getSchemaImportName(name)}'

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
    ...props,
    fetcher: get${pascalName},

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGet${pascalName}',
        metadata: { props },
      })
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
      const schemaName = getSchemaName(name)
      const propsName = `Create${pascalName}Props`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'
      import logError from '@/src/lib/utils/loggers/logError/logError'

      import type ${schemaName} from '../../${getSchemaImportName(name)}'

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
            logError({
              error: error.error, 
              fnName: 'useCreate${pascalName}',
              metadata: { props },
            })
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
      const schemaName = getSchemaName(name)
      const propsName = `Update${pascalName}Props`

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
      import logError from '@/src/lib/utils/loggers/logError/logError'

      import type ${schemaName} from '../../${getSchemaImportName(name)}'

      export type ${propsName} = UpdaterProps<${schemaName}>
      
      // updater      
      export const update${pascalName} = async (props: ${propsName}) => {
        console.log(props)
        return undefined
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
            logError({
              error: error.error, 
              fnName: 'useUpdate${pascalName}',
              metadata: { props },
            })
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
      const schemaName = getSchemaName(name)
      const propsName = `Remove${pascalName}Props`

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'
      import logError from '@/src/lib/utils/loggers/logError/logError'
      
      import type ${schemaName} from '../../${getSchemaImportName(name)}'

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
            logError({
              error: error.error, 
              fnName: 'useRemove${pascalName}',
              metadata: { props },
            })
            props?.onRemoveError && props.onRemoveError(error)
          },
        }
      
        return remove
      }
      
`
    },
  },

  // ui List

  // ui main
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/${componentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const useName = `use${pascalName}`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import UseDataUi from '@useweb/use-data-ui'
      
      import ${useName}, {
        type Use${pascalName}Props,
      } from '../../${useName}/${useName}'
      import type ${nameSinglePascal}Schema from '../../${getSchemaImportName(name)}'
      
      import ${componentName}Data from './${componentName}Data/${componentName}Data'
      import ${componentName}EmptyData from './${componentName}EmptyData/${componentName}EmptyData'
      import ${componentName}Loading from './${componentName}Loading/${componentName}Loading'
      import ${componentName}Error from './${componentName}Error/${componentName}Error'
      
      export type ${componentName}Props = {
        dataConfig?: Use${pascalName}Props
      }
      
      export default function ${componentName}(props: ${componentName}Props) {
        const ${camelCase} = ${useName}(props.dataConfig)
      
        return (
          <Wrapper>
            <UseDataUi<${nameSinglePascal}Schema>
              asyncFunctionVariable={${camelCase}}
              data={${componentName}Data}
              emptyData={${componentName}EmptyData}
              loading={${componentName}Loading}
              error={${componentName}Error}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${componentName}' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui with data
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/${componentName}Data/${componentName}Data.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const listItemComponentName = `${componentName}Item`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../${getSchemaImportName(name)}'
      import ${listItemComponentName} from '../ui/${listItemComponentName}/${listItemComponentName}'

      
      export type ${componentName}DataProps = UseDataUiComponentProps<${nameSinglePascal}Schema>['data']
      
      export default function ${componentName}Data(props: ${componentName}DataProps) {
        return (
          <Wrapper>
            <List<${nameSinglePascal}Schema>
              data={props.data || []}
              ListItemComponent={({ itemData }) => {
                return <${listItemComponentName} {...(itemData || {})} />
              }}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${componentName}Data' sx={{}}>
            {children}
          </Box>
        )
      }`
    },
  },

  // ui data list item
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}ListItem`

      return `ui/${pascalName}List/ui/${componentName}/${componentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}ListItem`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `import React from 'react'
import Box from '@useweb/ui/Box'

import { ${componentName}DataProvider } from './use${componentName}Data/use${componentName}Data'
import ${schemaName} from '../../../../${getSchemaImportName(name)}'

export type ${componentName}Props = ${schemaName}

export default function ${componentName}(props: ${componentName}Props) {
  return (
    <${componentName}DataProvider props={props}>
      <${componentName}Ui />
    </${componentName}DataProvider>
  )
}

const ${componentName}Ui = () => {
  return (
    <Box
      data-id='${componentName}'
      sx={{}}
    >
      ${componentName}
    </Box>
  )
}`
    },
  },

  // ui item provider
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `use${pascalName}ListItemData`

      return `ui/${pascalName}List/ui/${pascalName}ListItem/${componentName}/${componentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}ListItemData`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `import React, { createContext, useContext } from 'react'
import type ${schemaName} from '../../../../../${getSchemaImportName(name)}'

export type ${componentName}Props = ${schemaName}

export type ${componentName}Return = ${componentName}Props

export const ${componentName}Context =
  createContext<${componentName}Return>(undefined as any)

type ${componentName}ProviderProps = {
  children: any
  props: ${componentName}Props
}

export const ${componentName}Provider = (
  props: ${componentName}ProviderProps,
) => {
  const data: ${componentName}Return = {
    ...props.props,
  }

  return (
    <${componentName}Context.Provider value={data}>
      {props.children}
    </${componentName}Context.Provider>
  )
}

const use${componentName} = () => useContext(${componentName}Context)

export default use${componentName}
`
    },
  },
  // ui item stories
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}ListItem.stories`

      return `ui/${pascalName}List/ui/${pascalName}ListItem/stories/${componentName}.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)
      const componentName = `${pascalName}ListItem`
      const storyPrefix = getStoryPrefix({ folderPath })
      const stubsName = getStubsName(name)

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ${camelCase}Stubs from '../../../../../${stubsName}'
import ${componentName}, { type ${componentName}Props } from '../../${componentName}/${componentName}'

const defaultArgs: ${componentName}Props = ${camelCase}Stubs[0]

export default {
  title: '${storyPrefix}/${pascalName}List/ui/${componentName}',
  args: defaultArgs
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ${componentName}Props) => {
  return (
    <>
      <${componentName} {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ${componentName}Props = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
`
    },
  },

  // ui empty data
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/${componentName}EmptyData/${componentName}EmptyData.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import EmptyMessage from '@useweb/ui/EmptyMessage'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../${getSchemaImportName(name)}'
      
      export type ${componentName}EmptyDataProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['emptyData']
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      export default function ${componentName}EmptyData(props: ${componentName}EmptyDataProps) {
        return <Wrapper><EmptyMessage subTitle='${componentName}EmptyData' /></Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${componentName}EmptyData' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui loading
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/${componentName}Loading/${componentName}Loading.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import LinearProgress from '@mui/material/LinearProgress'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../${getSchemaImportName(name)}'
      
      export type ${componentName}LoadingProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['loading']
      
      export default function ${componentName}Loading(props: ${componentName}LoadingProps) {
        return (
          <Wrapper>
            <LinearProgress />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${componentName}Loading' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui error
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/${componentName}Error/${componentName}Error.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../${getSchemaImportName(name)}'
      
      export type ${componentName}ErrorProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['error']
      
      export default function ${componentName}Error(props: ${componentName}ErrorProps) {
        const error =
        props.error instanceof Error ? String(props.error) : JSON.stringify(props.error)

        return (
          <Wrapper>
            <Text
              text={error}
              sx={{
                color: 'red',
              }}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${componentName}Error' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui stories
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`

      return `ui/${componentName}/stories/${name}List.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}List`
      const storyPrefix = getStoryPrefix({ folderPath })

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      import PixelPerfect from '@useweb/pixel-perfect'
      
      import ${componentName}Stubs from '../../../${getStubsName(name)}'
      import ${componentName}, { type ${componentName}Props } from '../${componentName}'
      import ${componentName}Data_ from '../${componentName}Data/${componentName}Data'
      import ${componentName}EmptyData_ from '../${componentName}EmptyData/${componentName}EmptyData'
      import ${componentName}Loading_ from '../${componentName}Loading/${componentName}Loading'
      import ${componentName}Error_ from '../${componentName}Error/${componentName}Error'
      
      const defaultArgs: ${componentName}Props = {
        config: {
          getOptions: {
            onGet: ({ result }) => console.log({ result }),
          },
        },
      }
      
      export default {
        title: '${storyPrefix}/${componentName}/ui/${componentName}',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      // full example
      export const ${componentName}Example = {
        render: (args) => {
          return (
            <>               
               {/* pass fetcher payload via config.getOptions.fetcherPayload */}
                <${componentName} {...args} />
            </>
          )
        },
      }
      
      // data
      export const ${componentName}WithData = {
        render: () => {
          return (
            <>      
              <${componentName}Data_ {...commonProps} data={${componentName}Stubs} />
            </>
          )
        },
      }
      
      // empty data
      export const ${componentName}EmptyData = {
        render: () => {
          return (
            <>      
              <${componentName}EmptyData_ {...commonProps} />
            </>
          )
        },
      }
      
      // loading
      export const ${componentName}Loading = {
        render: () => {
          return (
            <>      
              <${componentName}Loading_ {...commonProps} />
            </>
          )
        },
      }
      
      // error
      export const ${componentName}Error = {
        render: () => {
          return (
            <>      
              <${componentName}Error_
                {...commonProps}
                error={new Error('${componentName} failed')}
              />
            </>
          )
        },
      }
      
      const commonProps = {
        exec: () => null,
      }
      `
    },
  },
]

const template = {
  type: 'Collection',
  files,
}

module.exports = {
  files,
  template,
}
