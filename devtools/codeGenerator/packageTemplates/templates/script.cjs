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

      try {
        // functionhere
        
        s.stop()    
        outro(chalk.green('Done'))
      } catch (error) {
        s.stop()
        outro(chalk.red(String(error)))
      }
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
