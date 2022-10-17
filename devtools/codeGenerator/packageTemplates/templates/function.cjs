// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`
      const returnName = `${helpers.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}Return`

      return `export type ${propsName} = {name: string}
    
    export default function ${name}(props: ${propsName}): ${returnName} {
      const data = 'hi'
      
      return { data }
    }
    
    export type ${returnName} = ReturnType<typeof ${name}>
    `
    },
  },
]

const template = {
  type: 'Function',
  files,
}

module.exports = {
  files,
  template,
}
