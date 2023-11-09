const functions = require('./function.cjs')
const story = require('./story.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  ...functions.files,
  ...story.functionStoryFiles,
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `use${pascalCase}/use${pascalCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import useAsync, { type UseAsyncProps } from '@useweb/use-async'
import logError from '@/src/lib/utils/loggers/logError/logError'

import ${camelCase}Fn, { type ${pascalCase}Props, type ${pascalCase}Return } from '../${camelCase}.js'

type Use${pascalCase}Props = Omit<
  UseAsyncProps<any, Awaited<${pascalCase}Return>>,
 'fn'>

export default function use${pascalCase}(props: Use${pascalCase}Props = {}) {
  const ${camelCase} = useAsync<
  ${pascalCase}Props, 
  Awaited<ReturnType<typeof ${name}Fn>>
  >({     fn: async (p) => {
    const data = await ${camelCase}Fn(p)
    return data
  },
  onError({ error }) {
    logError({
      error,
      fnName: 'use${pascalCase}',
    })
  },
  ...props, })

  return ${camelCase}
}
    `
    },
  },
]

const template = {
  type: 'Function with useAsync',
  files,
}

module.exports = {
  files,
  template,
}
