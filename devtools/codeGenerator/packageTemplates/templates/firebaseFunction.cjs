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

      return `
      import ${name}, {
        type ${propsName} as Props,
      } from './${name}.js'
      
      export type ${propsName} = {
        payload: Props
      }
      
      export default async function firebase_${name}({
        payload,
      }: ${propsName}) {
        const res = await ${name}(payload)
      
        return res
      }`
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
