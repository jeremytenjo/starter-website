const { functionStoryFiles } = require('./story.cjs')
const dataComponentUi = require('./dataComponentUi.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // function
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import task from '@useweb/task'

      import type ${pascalName}Schema from './${pascalName}.schema'

      export type ${pascalName}Props = any
      
      export default async function ${camelCase}(props: ${pascalName}Props): ${pascalName}Return {
        const task1Data = await task({
          title: 'task1',
          fn: async () => {
            return 'replace this string with async function eg await asyncfunction()'
          },
        })
      
        return { task1Data }
      }
      
      export type ${pascalName}Return = Promise<${pascalName}Schema>
      `
    },
  },

  // hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/use${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const resultSchema = `${pascalName}ResultSchema`
      const camelCase = helpers.changeCase.camelCase(name)

      return `import useAsync from '@useweb/use-async'

      import ${camelCase}, { type ${pascalName}Props, type ${pascalName}Return } from '../${camelCase}'

      export type ExecProps = ${pascalName}Props
      
      export type ${resultSchema} = ${pascalName}Return

      export default function use${pascalName}() {
        const ${camelCase}Fn = useAsync<ExecProps, ${resultSchema}>({
          fn: ${camelCase}
        })
      
        return ${camelCase}Fn
      }    
      
      `
    },
  },

  // hook fetcher stories
  ...functionStoryFiles,

  // store
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `use${pascalName}/use${pascalName}Store/use${pascalName}Store.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `import create from 'zustand'

      type Use${pascalName}StoreProps = {
        item: string
        setItem: (props: { value: string }) => void
      }
      
      const use${pascalName}Store = create<Use${pascalName}StoreProps>((set) => ({
        item: 'hello',
        setItem: ({ value }) => {
          set(() => ({ item: value }))
        },
      
      }))
      
      export default use${pascalName}Store
      
      `
    },
  },

  // schema
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      return `${pascalName}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `
      // TODO add ${pascalName} Schema

      type ${pascalName} = any
      
      export default ${pascalName}
      `
    },
  },

  // stubs
  {
    path: ({ name }) => {
      return `${name}.stubs.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)
      const schemaName = `${pascalName}Schema`

      return `
      import type ${schemaName} from './${pascalName}.schema'
          
      const ${camelCase}Stubs: ${schemaName}[] = [
        // TODO add ${pascalName} stubs
      ]
      
      export default ${camelCase}Stubs
`
    },
  },

  // ui
  ...dataComponentUi.files,
]

const template = {
  type: 'Data Component',
  files,
}

module.exports = {
  files,
  template,
}
