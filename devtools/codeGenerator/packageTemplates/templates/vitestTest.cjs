// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
// https://vitest.dev/api/
const files = [
  {
    path: ({ name }) => `${name}.vitest.ts`,
    template: () => {
      return `// https://vitest.dev/api/
      import { expect, test } from 'vitest'
      
      test('Success', async () => {
        const expected = 0
        const result = 0
      
        expect(result).toBe(expected)
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
