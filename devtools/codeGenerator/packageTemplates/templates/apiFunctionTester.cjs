// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.stories.tsx`,
    template: ({ name }) => {
      return `import React from 'react'
      import NextApiTester from '@useweb/next-api-tester'
      
      export default {
        title: 'api/${name}',
      }
      
      export const Test = () => (
        <NextApiTester
          name='${name}'
          payload={{
            method: 'post',
            body: JSON.stringify({
              name: 'hello',
            }),
          }}
        />
      )`
    },
  },
]

const template = {
  type: 'API Function Tester',
  files,
}

module.exports = {
  files,
  template,
}
