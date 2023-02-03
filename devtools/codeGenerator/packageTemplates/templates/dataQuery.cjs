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

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      
      import type ${schemaName} from '../../../${getSchemaImportName(name)}'
      
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
      const propsName = `Create${pascalName}Props`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

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

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

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

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

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

      return `ui/${pascalName}/${pascalName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
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
      
      import ${pascalName}Data from './${pascalName}Data/${pascalName}Data'
      import ${pascalName}EmptyData from './${pascalName}EmptyData/${pascalName}EmptyData'
      import ${pascalName}Loading from './${pascalName}Loading/${pascalName}Loading'
      import ${pascalName}Error from './${pascalName}Error/${pascalName}Error'
      
      export type ${pascalName}Props = {
        UseProps?: Use${pascalName}Props
      }
      
      export default function ${pascalName}(props: ${pascalName}Props) {
        const ${camelCase} = ${useName}(props.UseProps)
      
        return (
          <Wrapper>
            <UseDataUi<${nameSinglePascal}Schema>
              asyncFunctionVariable={${camelCase}}
              data={${pascalName}Data}
              emptyData={${pascalName}EmptyData}
              loading={${pascalName}Loading}
              error={${pascalName}Error}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}' sx={{}}>
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

      return `ui/${pascalName}/${pascalName}Data/${pascalName}Data.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${pascalName}DataProps = UseDataUiComponentProps<${nameSinglePascal}Schema>['data']
      
      export default function ${pascalName}Data(props: ${pascalName}DataProps) {
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
          <Box data-id='${pascalName}Data' sx={{}}>
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

      return `ui/${pascalName}/${pascalName}EmptyData/${pascalName}EmptyData.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${pascalName}EmptyDataProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['emptyData']
      
      export default function ${pascalName}EmptyData(props: ${pascalName}EmptyDataProps) {
        return <Wrapper>${pascalName}EmptyData</Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}EmptyData' sx={{}}>
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

      return `ui/${pascalName}/${pascalName}Loading/${pascalName}Loading.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import LinearProgress from '@mui/material/LinearProgress'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${pascalName}LoadingProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['loading']
      
      export default function ${pascalName}Loading(props: ${pascalName}LoadingProps) {
        return (
          <Wrapper>
            <LinearProgress />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}Loading' sx={{}}>
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

      return `ui/${pascalName}/${pascalName}Error/${pascalName}Error.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${pascalName}ErrorProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['error']
      
      export default function ${pascalName}Error(props: ${pascalName}ErrorProps) {
        return (
          <Wrapper>
            <ErrorMessage error={props.error} />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}Error' sx={{}}>
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

      return `ui/${pascalName}/stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath })

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React, { useEffect } from 'react'
      import PixelPerfect from '@useweb/pixel-perfect'
      
      import ${pascalName}Stubs from '../../../../../${lowercaseFirstLetter(
        splitCamelCase(name),
      )}.stubs'
      import ${pascalName}, { type ${pascalName}Props } from '../${pascalName}'
      import ${pascalName}Data_ from '../${pascalName}Data/${pascalName}Data'
      import ${pascalName}EmptyData_ from '../${pascalName}EmptyData/${pascalName}EmptyData'
      import ${pascalName}Loading_ from '../${pascalName}Loading/${pascalName}Loading'
      import ${pascalName}Error_ from '../${pascalName}Error/${pascalName}Error'
      
      const defaultArgs: ${pascalName}Props = {
        UseProps: {
          getOptions: {
            onGet: ({ result }) => console.log({ result }),
          },
        },
      }
      
      export default {
        title: '${storyPrefix}/${pascalName}/ui/${pascalName}',
        args: defaultArgs,
      }
      
      // full example
      export const ${pascalName}Example = {
        render: () => {
          return (
            <>
              <PixelPerfect
                assets={[
                  {
                    width: 0,
                    url: '',
                  },
                  {
                    width: 1920,
                    url: '',
                  },
                ]}
              />
                {/* pass fetcher payload via UseProps.getOptions.fetcherPayload */}
                <${pascalName} />
            </>
          )
        },
      }
      
      // data
      export const ${pascalName}WithData = {
        render: () => {
          return (
            <>
              <PixelPerfect
                assets={[
                  {
                    width: 0,
                    url: '',
                  },
                  {
                    width: 1920,
                    url: '',
                  },
                ]}
              />
      
              <${pascalName}Data_ {...commonProps} data={${pascalName}Stubs} />
            </>
          )
        },
      }
      
      // empty data
      export const ${pascalName}EmptyData = {
        render: () => {
          return (
            <>
              <PixelPerfect
                assets={[
                  {
                    width: 0,
                    url: '',
                  },
                  {
                    width: 1920,
                    url: '',
                  },
                ]}
              />
      
              <${pascalName}EmptyData_ {...commonProps} />
            </>
          )
        },
      }
      
      // loading
      export const ${pascalName}Loading = {
        render: () => {
          return (
            <>
              <PixelPerfect
                assets={[
                  {
                    width: 0,
                    url: '',
                  },
                  {
                    width: 1920,
                    url: '',
                  },
                ]}
              />
      
              <${pascalName}Loading_ {...commonProps} />
            </>
          )
        },
      }
      
      // error
      export const ${pascalName}Error = {
        render: () => {
          return (
            <>
              <PixelPerfect
                assets={[
                  {
                    width: 0,
                    url: '',
                  },
                  {
                    width: 1920,
                    url: '',
                  },
                ]}
              />
      
              <${pascalName}Error_
                {...commonProps}
                error={new Error('${pascalName} failed')}
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
