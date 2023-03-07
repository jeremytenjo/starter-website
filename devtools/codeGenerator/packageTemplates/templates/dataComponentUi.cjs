const { getStoryPrefix } = require('./story.cjs')

const dataComponentName = 'Data Component'

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // stories
  {
    path: ({ name, helpers, type }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const prefix = type === dataComponentName ? 'ui/' : '/'
      return `${prefix}${pascalName}/stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath: folderPath })

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      
      import ${pascalName}Stubs from '../../../${name}.stubs'
      import ${pascalName} from '../${pascalName}'
      import ${pascalName}Result_ from '../${pascalName}Result/${pascalName}Result'
      import ${pascalName}Loading_ from '../${pascalName}Loading/${pascalName}Loading'
      import ${pascalName}Error_ from '../${pascalName}Error/${pascalName}Error'
      
      export default {
        title: '${storyPrefix}/${name}/ui/${pascalName}',
        parameters: {
          signInAs: false,
        },
      }
      
      // full example
      export const ${pascalName}Example = {
        render: () => {
          return (
            <>
              <${pascalName} />
            </>
          )
        },
      }
      
      // result
      export const ${pascalName}WithResult = {
        render: () => {
          return (
            <>
              <${pascalName}Result_ {...commonProps} result={${pascalName}Stubs as any} />
            </>
          )
        },
      }
      
      // loading
      export const ${pascalName}Loading = {
        render: () => {
          return (
            <>
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

  // main

  {
    path: ({ name, helpers, type }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const prefix = type === dataComponentName ? 'ui/' : '/'

      return `${prefix}${pascalName}/${pascalName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import UseAsyncUi from '@useweb/use-async-ui'
      
      import use${pascalName} from '../../use${pascalName}/use${pascalName}'

      import ${pascalName}Result from './${pascalName}Result/${pascalName}Result'
      import ${pascalName}Loading from './${pascalName}Loading/${pascalName}Loading'
      import ${pascalName}Error from './${pascalName}Error/${pascalName}Error'
      
      export default function ${pascalName}() {
        const ${name} = use${pascalName}()
      
        return (
          <Wrapper>
            <UseAsyncUi
              asyncFunctionVariable={${name}}
              result={${pascalName}Result}
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

  // result
  {
    path: ({ name, helpers, type }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const prefix = type === dataComponentName ? 'ui/' : '/'

      return `${prefix}${pascalName}/${pascalName}Result/${pascalName}Result.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import { type UseAsyncUiComponentProps } from '@useweb/use-async-ui'
      
      import type ${pascalName}Schema from '../../../${pascalName}.schema'
      
      export type ${pascalName}ResultProps = UseAsyncUiComponentProps<${pascalName}Schema>['result']
      
      export default function ${pascalName}Result(props: ${pascalName}ResultProps) {
        return <Wrapper>${pascalName}Result</Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}Result' sx={{}}>
            {children}
          </Box>
        )
      }`
    },
  },

  // loading
  {
    path: ({ name, helpers, type }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const prefix = type === dataComponentName ? 'ui/' : '/'

      return `${prefix}${pascalName}/${pascalName}Loading/${pascalName}Loading.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import LinearProgress from '@mui/material/LinearProgress'
      import { type UseAsyncUiComponentProps } from '@useweb/use-async-ui'
      
      import type ${pascalName}Schema from '../../../${pascalName}.schema'
      
      export type ${pascalName}LoadingProps =
        UseAsyncUiComponentProps<${pascalName}Schema>['loading']
      
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

  // error
  {
    path: ({ name, helpers, type }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const prefix = type === dataComponentName ? 'ui/' : '/'

      return `${prefix}${pascalName}/${pascalName}Error/${pascalName}Error.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import { type UseAsyncUiComponentProps } from '@useweb/use-async-ui'
      
      import type ${pascalName}Schema from '../../../${pascalName}.schema'
      
      export type ${pascalName}ErrorProps =
        UseAsyncUiComponentProps<${pascalName}Schema>['error']
      
      export default function ${pascalName}Error(props: ${pascalName}ErrorProps) {
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
          <Box data-id='${pascalName}Error' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },
]

const template = {
  type: 'Data Component UI',
  files,
  options: {
    createNamedFolder: false,
  },
}

module.exports = {
  files,
  template,
}
