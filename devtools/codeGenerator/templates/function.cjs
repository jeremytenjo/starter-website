// https://github.com/jeremytenjo/quick-component-creator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `type ${propsName} = {name: string}
    
    export default function ${name}({name}: ${propsName}) {
      const data = 'hi'
      
      return data
    }`
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
