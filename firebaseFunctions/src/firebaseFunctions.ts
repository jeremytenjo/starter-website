import * as functions from 'firebase-functions'

import appConfig from '../../app.config.cjs'

import firebaseFunctionExample_firebase from './firebaseFunctionExample/firebaseFunctionExample.js'

// https://firebase.google.com/docs/functions/get-started

export const firebaseFunctionExample = functions
  .runWith({
    timeoutSeconds: 15,
    memory: '1GB',
  })
  .https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', appConfig.siteInfo.domain)

    let payload: any = {}

    try {
      payload = JSON.parse(req.body)
    } catch (e) {
      payload = req.body
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
  })
