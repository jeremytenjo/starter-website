import type { NextApiRequest, NextApiResponse } from 'next'

import exampleApi from '../../apiFunction/exampleApi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body = {}

  try {
    body = JSON.parse(req.body)
  } catch (e) {
    body = req.body
  }

  try {
    const data = await exampleApi({ req, body } as any)

    res.status(200).json({ sucess: data })
  } catch (error: any) {
    console.log('exampleApi API ERROR:', error)
    res.status(500).json({ error: error.toString() })
  }
}
