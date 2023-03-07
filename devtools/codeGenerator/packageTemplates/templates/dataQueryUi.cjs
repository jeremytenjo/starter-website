const pluralize = require('pluralize')

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

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
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
      import BoxWithSkeleton from '@useweb/ui/BoxWithSkeleton'
      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}DataProps = UseDataUiComponentProps<${nameSinglePascal}Schema>['data']

      export const listSx = {
        gap: '10px',
      }
      
      export default function ${ListComponentName}Data(props: ${ListComponentName}DataProps) {
        return (
          <Wrapper>
            <List<${nameSinglePascal}Schema>
              data={props.data || []}
              ListItemComponent={({ itemData }) => {
                return <${ListComponentName}Item ${nameSingle}={itemData} />
              }}
              sx={{
                ...listSx,
              }}
            />
          </Wrapper>
        )
      }

      export function ${ListComponentName}Item(props: { ${nameSingle}?: ${nameSinglePascal}Schema; loading?: boolean }) {
        return (
          <Box data-id='${ListComponentName}Item' sx={{}}>
            <BoxWithSkeleton loading={props.loading}>
              ${ListComponentName}Item
            </BoxWithSkeleton>
          </Box>
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
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      import { ${ListComponentName}Item, listSx } from '../${ListComponentName}Data/${ListComponentName}Data'

      import type ${nameSinglePascal}Schema from '../../../../../${getSchemaImportName(
        name,
      )}'
      
      export type ${ListComponentName}LoadingProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['loading']
      
      export default function ${ListComponentName}Loading() {
        const array = Array.from({ length: 5 }).map((_, id) => ({
          id: id.toString(),
        }))

        return (
          <Wrapper>
            <List<any>
              data={array || []}
              ListItemComponent={() => {
                return <${ListComponentName}Item loading />
              }}
            sx={listSx}
          />
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
        parameters: {
          signInAs: false,
        },
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
              <${ListComponentName}Loading_ />
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
  type: 'Data Query UI',
  files,
}

module.exports = {
  files,
  template,
}
