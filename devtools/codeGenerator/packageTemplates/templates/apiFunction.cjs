// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: () => {
      return `import type { NextApiRequest, NextApiResponse } from 'next'

      export default function handler(req: NextApiRequest, res: NextApiResponse) {
        console.log(req.body)
        try {
          res.status(200).json({ sucess: 'hello from the example api :)' })
        } catch (error: any) {
          console.log('API ERROR:', error)
          res.status(500).json({ error: error.toString() })
        }
      }`
    },
  },
]

const template = {
  type: 'API Function',
  files,
}

module.exports = {
  files,
  template,
}
