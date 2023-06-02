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

      const body: ${upperNameNoSpace}Props['body'] = {
        name: '${upperNameNoSpace}',
      }
      
      export default {
        title: 'Cloud Functions/next/${upperName}',
        args: {
          payload: body
        },
        parameters: {
          signInAs: false,
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
        return <AsyncTester<
        any,
        {
          payload: ${upperNameNoSpace}Props['body']
        }
        >
          // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
          fn={async () => fetcher(args)} 
          autoExec 
        />
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
