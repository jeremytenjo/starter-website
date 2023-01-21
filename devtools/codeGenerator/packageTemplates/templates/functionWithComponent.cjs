const functionwithstory = require('./functionWithStory.cjs')
const componentwithstory = require('./componentWithStory.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  ...functionwithstory.template.files,
  ...componentwithstory.template.files,
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `use${pascalCase}/use${pascalCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import useAsync from '@useweb/use-async'
import ${camelCase}Fn, { type ${pascalCase}Props } from '../${camelCase}'

export default function use${pascalCase}() {
  const ${camelCase} = useAsync<${pascalCase}Props, any>({ fn: ${camelCase}Fn })

  return ${camelCase}
}
    `
    },
  },
]

const template = {
  type: 'Function with Component',
  files,
}

module.exports = {
  files,
  template,
}