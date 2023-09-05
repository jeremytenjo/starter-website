const functions = require('./function.cjs')
const story = require('./story.cjs')
const component = require('./component.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  ...functions.files,
  ...story.functionStoryFiles,
  ...story.functionWithComponentStoryFiles,
  ...component.files,
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `use${pascalCase}/use${pascalCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import useAsync, { type UseAsyncProps } from '@useweb/use-async'
import ${camelCase}Fn, { type ${pascalCase}Props } from '../${camelCase}.js'

type Use${pascalCase}Props = Omit<UseAsyncProps, 'fn'>

export default function use${pascalCase}(props = {} as Use${pascalCase}Props) {
  const ${camelCase} = useAsync<${pascalCase}Props, any>({ fn: ${camelCase}Fn, ...props })

  return ${camelCase}
}
    `
    },
  },
]

const template = {
  type: 'useAsync Function',
  files,
}

module.exports = {
  files,
  template,
}
