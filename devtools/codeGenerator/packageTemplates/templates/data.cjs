const pluralize = require('pluralize')
const dataQuery = require('./dataQuery.cjs')

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // schema
  {
    path: ({ name, helpers }) => {
      const nameSingle = helpers.changeCase.pascalCase(pluralize.singular(name))
      return `${lowercaseFirstLetter(nameSingle)}.schema.ts`
    },
    template: ({ name, helpers }) => {
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `
      type ${schemaName} = {
        id: string
        uid: string
        name: string
      }
      
      export default ${schemaName}
      `
    },
  },

  // stubs
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `${camelCase}.stubs.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const schemaName = `${nameSinglePascal}Schema`

      return `
      import type ${schemaName} from './${lowercaseFirstLetter(nameSingle)}.schema'
          
      const ${camelCase}Stubs: ${schemaName}[] = []
      
      export default ${camelCase}Stubs
`
    },
  },

  // config
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      return `${camelCase}.config.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)

      return `export const ${camelCase}CollectionName = '${camelCase}'`
    },
  },

  // readme
  {
    path: () => {
      return `queries/readme.md`
    },
    template: () => {
      return `Use this folder to add 'Data Queries'`
    },
  },

  ...dataQuery.files,
]

const template = {
  type: 'Data',
  files,
}

module.exports = {
  files,
  template,
}
