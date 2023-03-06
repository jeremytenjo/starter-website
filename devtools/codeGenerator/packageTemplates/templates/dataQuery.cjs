const pluralize = require('pluralize')
const changeCase = require('change-case')

const { getStoryPrefix } = require('./story.cjs')

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

const splitCamelCase = (string) => {
  return string.split(/(?=[A-Z])/).map((s) => s.toLowerCase())[0]
}

const getSchemaImportName = (rawName) => {
  const singularName = pluralize.singular(lowercaseFirstLetter(splitCamelCase(rawName)))
  return `${singularName}.schema`
}

const getSchemaName = (rawName) => {
  const schemaName = pluralize.singular(changeCase.pascalCase(splitCamelCase(rawName)))
  return `${schemaName}Schema`
}

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
      const camelCase = helpers.changeCase.camelCase(name)
      const schemaName = getSchemaName(name)
      const getpropsName = `Get${pascalName}Props`
      const createpropsName = `Create${pascalName}PayloadProps`
      const propsUpdaterName = `Update${pascalName}PayloadProps`
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      
      import type ${schemaName} from '../../../${getSchemaImportName(name)}'
      
      import useGet${pascalName}, { type ${getpropsName} } from './useGet${pascalName}/useGet${pascalName}'
      import useCreate${pascalName}, { type ${createpropsName} } from './useCreate${pascalName}/useCreate${pascalName}'
      import useUpdate${pascalName}, { type ${propsUpdaterName} } from './useUpdate${pascalName}/useUpdate${pascalName}'
      import useRemove${pascalName}, { type ${removePropsName} } from './useRemove${pascalName}/useRemove${pascalName}'
      
      export type Use${pascalName}Props = {
        getOptions?: UseDataProps<${schemaName}, ${getpropsName}>['get']
        createOptions?: UseDataProps<${schemaName}, ${createpropsName}>['create']
        updateOptions?: UseDataProps<${schemaName}, ${propsUpdaterName}>['update']
        removeOptions?: UseDataProps<${schemaName}, ${removePropsName}>['remove']
      }
      
      export default function use${pascalName}(
        props: Use${pascalName}Props = {},
      ) {
        const get = useGet${pascalName}({...props?.getOptions})
        const create = useCreate${pascalName}(props?.createOptions)
        const update = useUpdate${pascalName}(props?.updateOptions)
        const remove = useRemove${pascalName}(props?.removeOptions)
      
        const ${camelCase} = useData<${schemaName}, ${getpropsName}, ${createpropsName}, ${propsUpdaterName}, ${removePropsName}>({
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
      import {
        create${pascalName},
        type Create${pascalName}PayloadProps,
      } from '../use${pascalName}/useCreate${pascalName}/useCreate${pascalName}'
      // update
      import {
        update${pascalName},
        type Update${pascalName}PayloadProps,
      } from '../use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}'
      // remove
      import {
        remove${pascalName},
        type Remove${pascalName}PayloadProps,
      } from '../use${pascalName}/useRemove${pascalName}/useRemove${pascalName}'
      
      export default {
        title: '${storyPrefix}/${pascalName}',
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
      //     const payload: Create${pascalName}PayloadProps = {}
      //     const fn = async () => create${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Update${pascalName} = {
      //   render: () => {
      //     const payload: Update${pascalName}PayloadProps = {}
      //     const fn = async () => update${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Remove${pascalName} = {
      //   render: () => {
      //     const payload: Remove${pascalName}PayloadProps = {}
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

import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

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
      console.error('useGet${pascalName}', error)
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
      const propsName = `Create${pascalName}PayloadProps`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

      export type ${propsName} = any

      // creator
      export const create${pascalName} = async (props: CreatorProps<${schemaName}, ${propsName}>) => {
        if (!props.newItem) {
          throw new Error('Missing newItem prop')
        }
        const newItem: ${schemaName} = props.newItem

        return { newItem }
      }

      export type Create${pascalName}Return = ReturnType<typeof create${pascalName}>
      
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
            console.error('useCreate${pascalName}', error)
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
      const propsUpdaterName = `Update${pascalName}PayloadProps`

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

      export type ${propsUpdaterName} = any

      type ${propsName} = UpdaterProps<${schemaName}, ${propsUpdaterName}>
      
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
            console.error('useUpdate${pascalName}', error)
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
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

      export type ${removePropsName} = any

      type ${propsName} = RemoverProps<${schemaName}, ${removePropsName}>
      
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
            console.error('useRemove${pascalName}', error)
            props?.onRemoveError && props.onRemoveError(error)
          },
        }
      
        return remove
      }
      
`
    },
  },

  // ui

  // ui main
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/${ListComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`
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
      import type ${nameSinglePascal}Schema from '../../../../${getSchemaImportName(
        name,
      )}'
      
      import ${ListComponentName}Data from './${ListComponentName}Data/${ListComponentName}Data'
      import ${ListComponentName}EmptyData from './${ListComponentName}EmptyData/${ListComponentName}EmptyData'
      import ${ListComponentName}Loading from './${ListComponentName}Loading/${ListComponentName}Loading'
      import ${ListComponentName}Error from './${ListComponentName}Error/${ListComponentName}Error'
      
      export type ${ListComponentName}Props = {
        dataConfig?: Use${pascalName}Props
      }
      
      export default function ${ListComponentName}(props: ${ListComponentName}Props) {
        const ${camelCase} = ${useName}(props.dataConfig)
      
        return (
          <Wrapper>
            <UseDataUi<${nameSinglePascal}Schema>
              asyncFunctionVariable={${camelCase}}
              data={${ListComponentName}Data}
              emptyData={${ListComponentName}EmptyData}
              loading={${ListComponentName}Loading}
              error={${ListComponentName}Error}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}' sx={{}}>
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
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/${ListComponentName}Data/${ListComponentName}Data.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}DataProps = UseDataUiComponentProps<${nameSinglePascal}Schema>['data']
      
      export default function ${ListComponentName}Data(props: ${ListComponentName}DataProps) {
        return (
          <Wrapper>
            <List<${nameSinglePascal}Schema>
              data={props.data || []}
              ListItemComponent={({ itemData = {} }) => {
                return 'Item'
              }}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Data' sx={{}}>
            {children}
          </Box>
        )
      }`
    },
  },

  // ui empty data
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/${ListComponentName}EmptyData/${ListComponentName}EmptyData.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}EmptyDataProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['emptyData']
      
      export default function ${ListComponentName}EmptyData(props: ${ListComponentName}EmptyDataProps) {
        return <Wrapper>${ListComponentName}EmptyData</Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}EmptyData' sx={{}}>
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
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/${ListComponentName}Loading/${ListComponentName}Loading.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import LinearProgress from '@mui/material/LinearProgress'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}LoadingProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['loading']
      
      export default function ${ListComponentName}Loading(props: ${ListComponentName}LoadingProps) {
        return (
          <Wrapper>
            <LinearProgress />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Loading' sx={{}}>
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
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/${ListComponentName}Error/${ListComponentName}Error.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}ErrorProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['error']
      
      export default function ${ListComponentName}Error(props: ${ListComponentName}ErrorProps) {
        return (
          <Wrapper>
            <ErrorMessage error={props.error} message='Error loading ${name}' />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Error' sx={{}}>
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
      const ListComponentName = `${pascalName}List`

      return `ui/${ListComponentName}/stories/${ListComponentName}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath })
      const ListComponentName = `${pascalName}List`

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      
      import ${pascalName}Stubs from '../../../../../${lowercaseFirstLetter(
        splitCamelCase(name),
      )}.stubs'
      import ${ListComponentName}, { type ${ListComponentName}Props } from '../${ListComponentName}'
      import ${ListComponentName}Data_ from '../${ListComponentName}Data/${ListComponentName}Data'
      import ${ListComponentName}EmptyData_ from '../${ListComponentName}EmptyData/${ListComponentName}EmptyData'
      import ${ListComponentName}Loading_ from '../${ListComponentName}Loading/${ListComponentName}Loading'
      import ${ListComponentName}Error_ from '../${ListComponentName}Error/${ListComponentName}Error'
      
      const defaultArgs: ${ListComponentName}Props = {
        dataConfig: {
          getOptions: {
            onGet: ({ result }) => console.log({ result }),
          },
        },
      }
      
      export default {
        title: '${storyPrefix}/${pascalName}/ui/${ListComponentName}',
        args: defaultArgs,
      }
      
      // full example
      export const ${ListComponentName}Example = {
        render: (args) => {
          return (
            <>                
                {/* pass fetcher payload via dataConfig.getOptions.fetcherPayload */}
                <${ListComponentName} {...args} />
            </>
          )
        },
      }
      
      // data
      export const ${ListComponentName}WithData = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Data_ {...commonProps} data={${pascalName}Stubs} />
            </>
          )
        },
      }
      
      // empty data
      export const ${ListComponentName}EmptyData = {
        render: () => {
          return (
            <>      
              <${ListComponentName}EmptyData_ {...commonProps} />
            </>
          )
        },
      }
      
      // loading
      export const ${ListComponentName}Loading = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Loading_ {...commonProps} />
            </>
          )
        },
      }
      
      // error
      export const ${ListComponentName}Error = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Error_
                {...commonProps}
                error={new Error('${ListComponentName} failed')}
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
  type: 'Data Query',
  files,
}

module.exports = {
  files,
  template,
}
