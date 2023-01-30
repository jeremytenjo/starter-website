// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.test.ts`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`
      const camelCase = helpers.changeCase.camelCase(name)

      return `// https://playwright.dev/docs/selectors
import { expect, type Page } from '@playwright/test'

type ${propsName} = {
  page: Page
}

export default async function ${camelCase}Test({ page }: ${propsName}) {
  await page.goto('/')

  const header = await page.innerText('h1')
  expect(header).toBe('Home Page')
}

      
      `
    },
  },
]

const template = {
  type: 'Playwright Test File',
  files,
  options: {
    createNamedFolder: false,
  },
}

module.exports = {
  files,
  template,
}
