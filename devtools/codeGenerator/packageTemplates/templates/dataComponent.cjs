const { getStoryPrefix, functionStoryFiles } = require('./story.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // function
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import task from '@useweb/task'

      import type ${pascalName}Schema from './${pascalName}.schema'

      export type ${pascalName}Props = any

      export type ${pascalName}Return = Promise<${pascalName}Schema>
      
      export default async function ${name}(props: ${pascalName}Props): ${pascalName}Return {
        const task1Data = await task({
          title: 'task1',
          fn: async () => 'replace this string with async function eg await asyncfunction()',
        })
      
        return { task1Data }
      }`
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
      const resultSchema = `${pascalName}ResultSchema`

      return `import useAsync from '@useweb/use-async'

      import ${name}, { type ${pascalName}Props, type ${pascalName}Return } from '../${name}'

      export type ExecProps = ${pascalName}Props
      
      export type ${resultSchema} = ${pascalName}Return

      export default function use${pascalName}() {
        const ${name}Fn = useAsync<${resultSchema}, ExecProps>({
          fn: ${name}
        })
      
        return ${name}Fn
      }    
      
      `
    },
  },

  // hook fetcher stories
  ...functionStoryFiles,

  // store
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/use${pascalName}Store/use${pascalName}Store.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import create from 'zustand'

      type Use${pascalName}StoreProps = {
        item: string
        setItem: (props: { value: string }) => void
      }
      
      const use${pascalName}Store = create<Use${pascalName}StoreProps>((set) => ({
        item: 'hello',
        setItem: ({ value }) => {
          set(() => ({ item: value }))
        },
      
      }))
      
      export default use${pascalName}Store
      
      `
    },
  },

  // schema
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `${pascalName}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
      // TODO add ${pascalName} Schema

      type ${pascalName} = any
      
      export default ${pascalName}
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
      const schemaName = `${pascalName}Schema`

      return `
      import type ${schemaName} from './${pascalName}.schema'
          
      const ${pascalName}Stubs: ${schemaName}[] = [
        // TODO add ${pascalName} stubs
      ]
      
      export default ${pascalName}Stubs
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
      const storyPrefix = getStoryPrefix({ folderPath: folderPath })

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      import PixelPerfect from '@useweb/pixel-perfect'
      
      import ${pascalName}Stubs from '../../../${name}.stubs'
      import ${pascalName} from '../${pascalName}'
      import ${pascalName}Result_ from '../${pascalName}Result/${pascalName}Result'
      import ${pascalName}Loading_ from '../${pascalName}Loading/${pascalName}Loading'
      import ${pascalName}Error_ from '../${pascalName}Error/${pascalName}Error'
      
      export default {
        title: '${storyPrefix}/${name}/ui/${pascalName}',
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

  // ui

  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `ui/${pascalName}/${pascalName}.tsx`
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
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `ui/${pascalName}/${pascalName}Result/${pascalName}Result.tsx`
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
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `ui/${pascalName}/${pascalName}Loading/${pascalName}Loading.tsx`
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
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `ui/${pascalName}/${pascalName}Error/${pascalName}Error.tsx`
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
  type: 'Data Component',
  files,
}

module.exports = {
  files,
  template,
}
