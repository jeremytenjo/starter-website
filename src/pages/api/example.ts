import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  console.log(body)

  try {
    res.status(200).json({ sucess: `hello ${body.name} from the example api :)` })
  } catch (error: any) {
    console.log('API ERROR:', error)
    res.status(500).json({ error: error.toString() })
  }
}
