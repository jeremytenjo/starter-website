const exampleRouteName = 'exampleRoute'

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // Raw Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import type { CallableRequest } from 'firebase-functions/v2/https'
      import ${camelCase}Routes from './routes/${camelCase}.routes.js'
      
      export type RouteSchemaProps = {
        route: string
        payload: any
        return: any
      }
      
      export type ${pascalCase}RouteSchema<RouteSchema extends RouteSchemaProps = any> = {
        authUser: CallableRequest['auth'] | undefined
        route: RouteSchema['route']
        payload: RouteSchema['payload']
        return: {
          data: RouteSchema['return']
        }
      }
      
      export type ${pascalCase}Props<RouteSchema extends RouteSchemaProps = any> = {
        authUser: ${pascalCase}RouteSchema['authUser']
        context: ${pascalCase}RouteSchema<RouteSchema>
      }
      
      export type ${pascalCase}Return<RouteSchema extends ${pascalCase}RouteSchema> =
        RouteSchema['return']
      
      export default async function ${camelCase}<RouteSchema extends ${pascalCase}RouteSchema>(
        props: ${pascalCase}Props,
      ): Promise<${pascalCase}Return<RouteSchema>> {
        if (props.context.route.startsWith('routes/')) {
          return await ${camelCase}Routes<RouteSchema>(props)
        }
      
        throw new Error(${'`'}Route doesn't exist - ${'${props.context.route}`'})
      }
      `
    },
  },

  // Client Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `${camelCase}.client.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import useAsync from '@useweb/use-async'
      import { httpsCallable } from 'firebase/functions'
      import type {
        RouteSchemaProps,
        ${pascalCase}Props,
        ${pascalCase}Return,
        ${pascalCase}RouteSchema,
      } from './${name}.js'
      import { functions } from '../../../src/lib/integrations/Google/Firebase/firebase.js'
      
      export type ${pascalCase}ClientProps<RouteSchema extends RouteSchemaProps> = Omit<
        ${pascalCase}Props<RouteSchema>['context'],
        'return' | 'authUser'
      >
      
      export default async function ${camelCase}Client<
        RouteSchema extends ${pascalCase}RouteSchema,
      >(
        props: ${pascalCase}ClientProps<RouteSchema>,
      ): Promise<${pascalCase}Return<RouteSchema>> {
        const ${name} = httpsCallable<
          ${pascalCase}ClientProps<RouteSchema>,
          ${pascalCase}Return<RouteSchema>
        >(functions, '${name}')
      
        const res = await ${name}(props)
      
        return res.data
      }
      
      export type ${pascalCase}ClientReturn<RouteSchema extends ${pascalCase}RouteSchema> =
        ${pascalCase}Return<RouteSchema>

      export function use${pascalCase}Client<RouteSchema extends ${pascalCase}RouteSchema>(
        props: ${pascalCase}ClientProps<RouteSchema>,
      ) {
        const ${camelCase} = useAsync<${pascalCase}ClientProps<RouteSchema>, any>({
          fn: async () => await ${camelCase}Client(props),
          onError({ error }) {
            logError({
              error,
              fnName: 'use${pascalCase}Client',
              metadata: { props },
            })
          },
        })
      
        return ${camelCase}
      }
      
      `
    },
  },

  // Firebase Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `${camelCase}.firebase.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import type { CallableRequest } from 'firebase-functions/v2/https'
      import ${camelCase} from './${camelCase}.js'
      import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'
      
      export type ${pascalCase}PropsPropsFirebase = {
        request: CallableRequest<any>
      }
      
      export default async function ${camelCase}Firebase(
        props: ${pascalCase}PropsPropsFirebase,
      ) {
        try {
          return await ${camelCase}<any>({
            authUser: props.request.auth,
            context: props.request.data,
          })
        } catch (error: any) {
          logFirebaseCloudFunctionError({
            fnName: '${camelCase}',
            description: error,
            uid: props.request?.auth?.uid,
            throwHttpsError: true,
            metadata: error.cause
          })
        }
      }`
    },
  },

  // Routes Index
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `routes/${camelCase}.routes.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import assert from '@useweb/assert'
      import type {
        ${pascalCase}Props,
        ${pascalCase}Return,
        ${pascalCase}RouteSchema,
      } from '../${camelCase}.js'
      import * as ${exampleRouteName} from './${exampleRouteName}/${exampleRouteName}.js'
      
      export type ${pascalCase}RoutesProps = ${pascalCase}Props
      
      export default async function ${camelCase}Routes<
        RouteSchema extends ${pascalCase}RouteSchema,
      >(props: ${pascalCase}RoutesProps): Promise<${pascalCase}Return<RouteSchema>> {
        assert<${pascalCase}RoutesProps>({
          props,
          requiredProps: ['context'],
        })
      
        if (props.context.route === ${exampleRouteName}.routeId) {
          try {
            return await ${exampleRouteName}.default({
              authUser: props.authUser,
              payload: props.context.payload,
            })
          } catch (error) {
            throw new Error(${'`${name.routeId}'} - ${'${error}`'})
          }
        }
            
        throw new Error(${'`'}Action doesn't exist - ${'${props.context.route}`'})
      }
      `
    },
  },

  // Routes Example
  {
    path: () => {
      return `routes/${exampleRouteName}/${exampleRouteName}.ts`
    },
    template: ({ helpers }) => {
      const fnNameCamelCase = helpers.changeCase.camelCase(exampleRouteName)
      const fnNamePascalCase = helpers.changeCase.pascalCase(exampleRouteName)

      return `import assert from '@useweb/assert'
      import type { CallableRequest } from 'firebase-functions/v2/https'
      
      export const routeId = ${'`'}routes/${fnNameCamelCase}${'`'}
      
      export type API${fnNamePascalCase}Props = {
        route: typeof routeId
        authUser: CallableRequest['auth']
        payload: {
          name: string
        }
        return: Awaited<${fnNamePascalCase}Return>
      }
      
      export type ${fnNamePascalCase}PropsInternal = Omit<API${fnNamePascalCase}Props, 'route' | 'return'>
      
      export default async function ${fnNameCamelCase}(props: ${fnNamePascalCase}PropsInternal): ${fnNamePascalCase}Return {
        assert<${fnNamePascalCase}PropsInternal>({ props, requiredProps: ['payload'] })
        assert<API${fnNamePascalCase}Props['payload']>({
          props: props.payload,
          requiredProps: [],
        })

        const data = 'hi'
      
        return { data }
      }
      
      export type ${fnNamePascalCase}Return = Promise<{
        data: any
      }>
      `
    },
  },

  // Route Example Stories
  {
    path: () => {
      return `routes/${exampleRouteName}/stories/${exampleRouteName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const fnNameCamelCase = helpers.changeCase.camelCase(exampleRouteName)
      const fnNamePascalCase = helpers.changeCase.pascalCase(exampleRouteName)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      import ${name}Client from '../../../${name}.client.js'
      import type { API${fnNamePascalCase}Props } from '../${fnNameCamelCase}.js'
      
      export default {
        title: 'Cloud Functions/firebase/${name}/routes/${fnNameCamelCase}',
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = () => {
        const fn = async () => {
          const res = await ${name}Client<API${fnNamePascalCase}Props>({
            route: 'routes/${fnNameCamelCase}',
            payload: {
              name: 'hello'
            },
          })
      
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
      }
      
      `
    },
  },
]

const template = {
  type: 'Firebase Function with API routes',
  files,
}

module.exports = {
  files,
  template,
}
