// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties

const files = [
  // api function
  {
    path: ({ name }) => {
      return `src/apiFunctions/${name}/${name}.ts`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name)
      const upperNameNoSpace = upperName.split(' ').join('')
      return `import type { NextApiRequest } from 'next'

      export type ${upperNameNoSpace}Props = {
        req?: NextApiRequest
        body: { name?: string }
      }
      
      export default async function ${name}(props: ${upperNameNoSpace}Props) {
        try {
          const data = 'hello ${name}'
      
          return data
        } catch (error: any) {
          throw new Error(error)
        }
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
      const upperNameNoSpace = upperName.split(' ').join('')

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import nextApi from '../../../lib/utils/nextjs/nextApi/nextApi'
      import { type ${upperNameNoSpace}Props } from '../${name}'
      
      export default {
        title: 'api/${upperName}',
        args: {
          payload: {
            name: '${name}'
          } as ${upperNameNoSpace}Props,
        },
      }
      
      const fetcher = async (args) => {
        const data = await nextApi({
          name: '${name}',
          payload: args.payload,
        })
      
        return data
      }
      
      export const Test = (args) => {
        return <AsyncTester fn={async () => fetcher(args)} autoExec />
      }
      `
    },
  },

  // vercel api function
  {
    path: ({ name }) => {
      return `src/pages/api/${name}.ts`
    },
    template: ({ name }) => {
      return `import type { NextApiRequest, NextApiResponse } from 'next'
  
        import ${name} from '../../apiFunctions/${name}/${name}'
        
        export default async function handler(req: NextApiRequest, res: NextApiResponse) {
          let body = {}
        
          try {
            body = JSON.parse(req.body)
          } catch (e) {
            body = req.body
          }
        
          try {
            const data = await ${name}({ body, req })
        
            res.status(200).json({ data })
          } catch (error: any) {
            console.log('${name} API:', error)
            res.status(500).json({ error: error.toString() })
          }
        }`
    },
  },
]

const template = {
  type: 'API Function',
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
