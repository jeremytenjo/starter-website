const playwrighttestfile = require('./playwrightTestFile.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  ...playwrighttestfile.files,
  {
    path: ({ name }) => `${name}.e2e.ts`,
    template: ({ name, helpers }) => {
      return `import { test } from '@playwright/test'

      import ${name} from './${name}.test.js'
      
      test('${helpers.changeCase.sentenceCase(name)}', async ({ page }) => {
        await ${name}({ page })
      })
      
      `
    },
  },
]

const template = {
  type: 'Playwright Test',
  files,
}

module.exports = {
  files,
  template,
}
