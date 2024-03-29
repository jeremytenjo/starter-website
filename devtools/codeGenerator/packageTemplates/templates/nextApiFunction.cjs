// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties

const files = [
  // raw function
  {
    path: ({ name }) => {
      return `src/apiFunctions/${name}/${name}.raw.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import assert from '@useweb/assert'
  
        export type ${pascalCase}Props = {
          name: string
        }
        
        export type ${pascalCase}Return = {
          id: string
          data: any[]
        }
        
        export default async function ${camelCase}(
          props: ${pascalCase}Props,
        ): Promise<${pascalCase}Return> {
          assert<${pascalCase}Props,>({ props, requiredProps: ['name'] })
        
          return {
            id: props.name,
            data: [
              {
                name: props.name,
              }
            ],
          }
        }
          `
    },
  },

  // next function
  {
    path: ({ name }) => {
      return `src/apiFunctions/${name}/${name}.next.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import type { NextApiRequest } from 'next'
      import ${camelCase}, {
        type ${pascalCase}Props,
      } from './${camelCase}.raw'
      
      export type ${pascalCase}NextProps = {
        req?: NextApiRequest
        body: ${pascalCase}Props
      }
      
      export default async function ${camelCase}_next(
        props: ${pascalCase}NextProps,
      ) {
        try {
          const data = await ${camelCase}({
            ...props.body,
          })
      
          return data
        } catch (error: any) {
          throw new Error(error, {
            cause: error.cause || {}
          })
        }
      }
        `
    },
  },

  // client function
  {
    path: ({ name }) => {
      return `src/apiFunctions/${name}/${name}.client.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import useData from '@useweb/use-data'
      import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'
      import logError from '@/src/lib/utils/loggers/logError/logError'

      import type {
        ${pascalCase}Props,
        ${pascalCase}Return,
      } from './${camelCase}.raw'

      export type { ${pascalCase}Props, ${pascalCase}Return }
      
      export default async function ${camelCase}Client(
        props: ${pascalCase}Props,
      ) {
        const { ...payload } = props || {}
        const res = await nextApi<${pascalCase}Return, ${pascalCase}Props>({
          name: '${camelCase}',
          payload,
        })

        if (res.error) {
          throw new Error(res.error)
        }
      
        return res
      }

      export const use${pascalCase} = (props: ${pascalCase}Props) => {
        const _${camelCase} = useData<
          ${pascalCase}Return,
          ${pascalCase}Props
        >({
          id: props.name
            ? '${camelCase}/props'
            : undefined,
          get: {
            fetcher: async () => {
              const { data } = await ${camelCase}Client(props)
      
              return [data]
            },
            onGetError({ error }) {
              logError({
                error,
                fnName: 'use${pascalCase}',
                metadata: { props },
              })
            },
          },
        })
      
        return _${camelCase}
      }
      `
    },
  },

  // api function story
  {
    path: ({ name }) => {
      return `src/apiFunctions/${name}/stories/${name}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import ${name}, { type ${pascalCase}Props } from '../${name}.client'
      
      const args: ${pascalCase}Props = {
        name: 'hello',
      }
      
      export default {
        title: 'Cloud Functions/next/${name}',
        args,
        parameters: {
          signInAs: false,
        },
      }
      
      export const Test = {
        render: (args: ${pascalCase}Props) => {
          return (
            <AsyncTester<
              any,
              {
                payload: ${pascalCase}Props
              }
            >
              // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
              fn={async () => await ${name}(args)}
              autoExec
            />
          )
        }
      }
        `
    },
  },

  // next api function
  {
    path: ({ name }) => {
      return `src/pages/api/${name}.ts`
    },
    template: ({ name }) => {
      return `import type { NextApiRequest, NextApiResponse } from 'next'
    
          import ${name} from '../../apiFunctions/${name}/${name}.next'
          
          export default async function handler(req: NextApiRequest, res: NextApiResponse) {
            let body: any = {}
          
            try {
              body = JSON.parse(req.body)
            } catch (e) {
              body = req.body
            }
          
            try {
              const data = await ${name}({ body, req })
              console.log('${name} API Response:')
              res.status(200).json({ data, error: undefined })
            } catch (error: any) {
              console.log('${name} API Error:')
              console.log(error)
              res.status(200).json({ error: String(error) })
            }
          }`
    },
  },
]

const template = {
  type: 'Next API Function',
  files,
  options: {
    outputInRootFolder: true,
    createNamedFolder: false,
  },
}

module.exports = {
  files,
  template,
}
