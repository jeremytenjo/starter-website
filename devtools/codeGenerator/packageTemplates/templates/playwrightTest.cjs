const playwrighttestfile = require('./playwrightTestFile.cjs')

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  ...playwrighttestfile.files,
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)

      return `${camelCase}.e2e.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)

      return `import { test, expect } from '@playwright/test'

      import ${camelCase} from './${camelCase}.test.js'
      
      test('${helpers.changeCase.sentenceCase(name)}', async ({ page }) => {
        const consoleErrors: Error[] = []
        page.on('pageerror', (err) => {
          consoleErrors.push(err)
        })

        await ${camelCase}({ page })
        expect(consoleErrors.length).toBe(0)
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
