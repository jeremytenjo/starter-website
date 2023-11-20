// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // API Route Handler
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers.changeCase.camelCase(name)
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import assert from '@useweb/assert'
      import logger from 'firebase-functions/logger'
      
      import type { PropsInternal } from '../../rootFunction.js'
      
      export type ${namePascalCase}Props = PropsInternal
      
      export default async function ${nameCamelCase}(props: ${namePascalCase}Props) {
        try {
          assert<${namePascalCase}Props>,({ props, requiredProps: ['payload'] })
          assert<${namePascalCase}Props['payload']>,({
            props: props.payload,
            requiredProps: ['id'],
          })
      
          const data = 'hi'
      
          logger.info('${nameCamelCase}', { data })
      
          return { data }
        } catch (error) {
          throw new Error('${nameCamelCase} - ${'${String(error)}'}')
        }
      }
      
      export type ${namePascalCase}Return = ReturnType<typeof ${nameCamelCase}>
      
      `
    },
  },
]

const template = {
  type: 'Firebase Function API Route Handler',
  files,
}

module.exports = {
  files,
  template,
}
