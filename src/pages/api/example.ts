import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ sucess: 'hello from the example api :)' })
  } catch (error: any) {
    console.log('API ERROR:', error)
    res.status(500).json({ error: error.toString() })
  }
}
