import { onRequest } from 'firebase-functions/v2/https'

import appConfig from '../../app.config.cjs'

import firebaseFunctionExample_firebase from './firebaseFunctionExample/firebaseFunctionExample.js'

// https://firebase.google.com/docs/functions/get-started

export const firebaseFunctionExample = onRequest(
  {
    timeoutSeconds: 15,
    memory: '1GiB',
  },
  async (req, res) => {
    res.set('Access-Control-Allow-Origin', appConfig.siteInfo.domain)

    let payload: any = {}

    try {
      payload = JSON.parse(req.body)?.data
    } catch (e) {
      payload = req.body?.data
    }

    try {
      const result = await firebaseFunctionExample_firebase(payload)
      res.status(200).json(result)
    } catch (error: any) {
      console.error(new Error(error))
      res.status(500).json({
        error: error.toString(),
      })
    }
  },
)
