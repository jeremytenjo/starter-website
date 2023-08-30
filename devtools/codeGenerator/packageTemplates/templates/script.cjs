// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name }) => {
      return `import { spinner, intro, outro } from '@clack/prompts'

    export default async function ${name}() {
      intro('${name}')
      console.log('hello')
      outro('Done ✨')
    }`
    },
  },
  {
    path: () => `run.ts`,
    template: ({ name }) => {
      return `import ${name} from './${name}.js'
      console.clear()
      ${name}()
      `
    },
  },
]

const template = {
  type: 'Script',
  files,
}

module.exports = {
  files,
  template,
}
