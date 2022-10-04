// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `import task from '../../../../../../utils/node/task/task'

export type ${propsName} = {name: string}

      export default async function ${name}(props: ${propsName}) {
        return await task({
          title: '${name}',
          fn: async () => await ${name}Fn(props),
        })
      }
      
    
     function ${name}Fn(props: ${propsName}) {
      console.log(props)
      const data = 'hi'
      
      return data
    }`
    },
  },
]

const template = {
  type: 'Data Function',
  files,
}

module.exports = {
  files,
  template,
}
