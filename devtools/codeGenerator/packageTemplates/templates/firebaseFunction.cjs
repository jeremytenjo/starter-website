// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // Raw Function
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`

      return `export type ${propsName} = {
        name: string
      }
      
      export default async function ${name}(
        props: ${propsName},
      ) {
        return {
          hello: props.name,
        }
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
    path: ({ name }) => `stories/${name}.stories.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`

      return `
      import React from 'react'
import FirebaseFunctionDashboard, {
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
    return <FirebaseFunctionDashboard {...args} />
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
