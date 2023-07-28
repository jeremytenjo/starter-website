// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties

const files = [
  // next api function
  {
    path: ({ name }) => {
      return `src/pages/api/${name}.ts`
    },
    template: ({ name }) => {
      return `import type { NextApiRequest, NextApiResponse } from 'next'
  
        import ${name} from '../../apiFunctions/${name}/${name}.next'
        
        export default async function handler(req: NextApiRequest, res: NextApiResponse) {
          console.log(' ')
          console.log(' ')
          console.log('${name} API Started')
          console.log(' ')

          let body: any = {}
        
          try {
            body = JSON.parse(req.body)
          } catch (e) {
            body = req.body
          }
        
          try {
            const data = await ${name}({ body, req })
            console.log(' ')
            console.log('${name} API Response:')
            console.log(' ')

            res.status(200).json({ data, error: undefined })
          } catch (error: any) {
            console.log(' ')
            console.log('${name} API Error:')
            console.log(' ')
            console.log(error)

            res.status(200).json({ error: String(error) })
          }
        }`
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
          throw new Error(error)
        }
      }
        `
    },
  },

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
        hello: string
      }
      
      export default async function ${camelCase}(
        props: ${pascalCase}Props,
      ): Promise<${pascalCase}Return> {
        assert<${pascalCase}Props,>({ props, requiredProps: ['name'] })
      
        return {
          hello: props.name,
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

      return `import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

      import type {
        ${pascalCase}Props,
        ${pascalCase}Return,
      } from './${camelCase}.raw'

      export type { ${pascalCase}Props, ${pascalCase}Return }
      
      type Return = {
        data: ${pascalCase}Return
      }
      
      export default async function ${camelCase}Client(
        props: ${pascalCase}Props,
      ): Promise<Return> {
        const res: Return = await nextApi<any, ${pascalCase}Props>({
          name: '${camelCase}',
          payload: props,
        })
      
        return res
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
      const upperName = helpers.changeCase.capitalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import ${name}, { type ${upperName}Props } from '../${name}.client'
      
      const args: ${upperName}Props = {
        name: 'hello',
      }
      
      export default {
        title: 'Cloud Functions/next/${name}',
        args,
        parameters: {
          signInAs: false,
        },
      }
      
      const fetcher = async (args: ${upperName}Props) => {
        const data = await ${name}(args)
      
        return data
      }
      
      export const Test = (args: ${upperName}Props) => {
        return (
          <AsyncTester<
            any,
            {
              payload: ${upperName}Props
            }
          >
            // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
            fn={async () => fetcher(args)}
            autoExec
          />
        )
      }
        `
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
