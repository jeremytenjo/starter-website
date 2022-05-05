// https://github.com/jeremytenjo/quick-component-creator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.test.ts`,
    template: () => {
      return `// https://vitest.dev/api/
      import { expect, test } from 'vitest'
      
      test('first test', () => {
        expect(true).toBe(true)
      })
      
      `
    },
  },
]

const template = {
  type: 'Vitest unit test',
  files,
}

module.exports = {
  files,
  template,
}
