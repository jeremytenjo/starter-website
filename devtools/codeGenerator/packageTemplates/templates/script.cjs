// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name }) => {
      return `import { spinner, intro, outro } from '@clack/prompts'
      import chalk from 'chalk'

    export default async function ${name}() {
      intro(chalk.cyan('${name}'))
      const s = spinner()
      s.start('${name} start')
      // functionhere
      s.stop()    
      outro(chalk.green('Done'))
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
