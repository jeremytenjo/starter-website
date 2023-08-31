// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import type { Page } from '@playwright/test'

      export type ${pascalCase}Props = { page: Page }
      
      export async function ${name}(props: ${pascalCase}Props) {
        // await
      }
      
      export type ${pascalCase}Return = ReturnType<typeof ${name}>
      
      
      `
    },
  },
]

const template = {
  type: 'Playwright Common Test',
  files,
}

module.exports = {
  files,
  template,
}
