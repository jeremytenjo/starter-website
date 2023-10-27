// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // API Route
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers.changeCase.camelCase(name)
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import assert from '@useweb/assert'
      import type { CallableRequest } from 'firebase-functions/v2/https'
      
      export const routeId = 'routes/${nameCamelCase}'
      
      export type API_${namePascalCase}Props = {
        route: typeof routeId
        authUser: CallableRequest['auth']
        payload: {
          name: string
        }
        return: Awaited<${namePascalCase}Return>
      }
      
      export type ${namePascalCase}PropsInternal = Omit<
        API_${namePascalCase}Props,
        'route' | 'return'
      >
      
      export default async function ${nameCamelCase}(
        props: ${namePascalCase}PropsInternal,
      ): ${namePascalCase}Return {
        assert<${namePascalCase}PropsInternal>({
          props,
          requiredProps: ['payload'],
        })
        assert<API_${namePascalCase}Props['payload']>({
          props: props.payload,
          requiredProps: ['name'],
        })

        console.log('props', props)
      
        return { 
          data: {
            success: true,
          },
         }
      }
      
      export type ${namePascalCase}Return = Promise<{
        data: {
          success: boolean
        }
      }>
      `
    },
  },

  // API Route Stories
  {
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers.changeCase.camelCase(name)
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import rootFunction_Client from '../../../rootFunction.client.js'
      import type { API_${namePascalCase}Props } from '../${nameCamelCase}.js'
      
      export default {
        title:
          'Cloud Functions/firebase/rootFunction/routes/${nameCamelCase}',
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = () => {
        const fn = async () => {
          const res =
            await rootFunction_Client<API_${namePascalCase}Props>(
              {
                route: 'routes/${nameCamelCase}',
                payload: {
                  name: 'hello',
                },
              },
            )
      
          return res
        }
      
        return (
          <>
            <AsyncTester<any, any> fn={fn} autoExec />
          </>
        )
      }
      
      export const Default = {
        render: () => {
          return <Template />
        },
      }`
    },
  },
]

const template = {
  type: 'Firebase Function API Route',
  files,
}

module.exports = {
  files,
  template,
}
