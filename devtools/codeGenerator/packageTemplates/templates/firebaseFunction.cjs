// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // Raw Function
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`
      const returnName = `${pascalCase}Return`

      return `export type ${propsName} = {
        name: string
      }

      export type ${returnName} = {
        hello: string
      }
      
      export default async function ${name}(
        props: ${propsName},
      ): Promise<${returnName}> {
        return {
          hello: props.name,
        }
      }`
    },
  },
  // Client Function - to use in the client (React, js, etc)
  {
    path: ({ name }) => `${name}.client.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`
      const returnName = `${pascalCase}Return`

      return `import { googleCloudFunction } from '@useweb/firebase/useFirebaseFunction'
      import firebaseConfig from '@/src/lib/integrations/Google/Firebase/firebase.config'

      import type {
        ${propsName},
        ${returnName},
      } from './${name}'
      
      export default async function ${name}Client(props: ${propsName}) {
        const res = await googleCloudFunction<
          ${propsName},
          {
            data: ${returnName}
          }
        >({
          name: '${name}',
          firebase: {
            firebaseConfig: firebaseConfig,
            envIsDev: process.env.NODE_ENV === 'development',
          },
          options: {
            payload: props,
          },
        })
      
        return res
      }`
    },
  },
  // Firebase Index
  {
    path: ({ name }) => `${name}.firebase.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`

      return `import type { Response } from 'express'
      import type { Request } from 'firebase-functions/v2/https'
      import logger from 'firebase-functions/logger'
      import nodePhError from '../../../src/lib/integrations/PostHog/node/nodePostHog/events/nodePhError/nodePhError.js'
      import appConfig from '../../../app.config.js'
      import ${name} from './${name}.js'
      
      export type ${propsName}Firebase = {
        req: Request
        res: Response
      }
      
      export default async function ${name}_firebase(
        props: ${propsName}Firebase,
      ) {
        if (process.env?.NODE_ENV !== 'development') {
          props.res.set('Access-Control-Allow-Origin', appConfig.siteInfo.domain)
          props.res.set('Access-Control-Allow-Origin', appConfig.siteInfo.previewDomain)
        }
        try {
          let payload: any = {}
      
          try {
            payload = JSON.parse(props.req.body)
          } catch (e) {
            payload = props.req.body
          }
      
          const data = await ${name}(payload)
          props.res.status(200).json({ data, error: undefined })
        } catch (error: any) {
          logger.error(error)
      
          nodePhError({
            description: error,
            fnName: '${name}',
          })
      
          props.res.status(500).json({
            error: error.toString(),
          })
        }
      }
      `
    },
  },
  // Story
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`

      return `
      import React from 'react'
import FirebaseFunctionTester, {
  type FirebaseFunctionTesterProps,
} from '@useweb/firebase-function-tester'

import type { ${propsName} } from '../${name}'

type ArgsProps = FirebaseFunctionTesterProps<any, ${propsName}>

const args: ArgsProps = {
  functionName: '${name}',
  payload: {
    name: 'ralph',
  },
}

export default {
  title: 'Cloud Functions/firebase/${name}',
  args,
}

export const Default = {
  render: (args: ArgsProps) => {
    return <FirebaseFunctionTester {...args} />
  },
}`
    },
  },
]

const template = {
  type: 'Firebase Function',
  files,
}

module.exports = {
  files,
  template,
}
