// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name, helpers }) => {
      return `${helpers.changeCase.camelCase(name)}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const propsName = `${helpers.changeCase.pascalCase(name).split(' ').join('')}Props`
      const returnName = `${helpers.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}Return`

      return `export type ${propsName} = {name: string}
    
    export default function ${camelCase}(props: ${propsName}) {
      const data = 'hi'
      
      return { data }
    }
    
    export type ${returnName} = ReturnType<typeof ${camelCase}>
    `
    },
  },
]

const template = {
  type: 'Hook - React',
  files,
}

module.exports = {
  files,
  template,
}
