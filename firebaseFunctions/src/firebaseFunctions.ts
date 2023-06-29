import { onRequest } from 'firebase-functions/v2/https'

import appConfig from '../../app.config.cjs'

import firebaseFunctionExample_firebase from './firebaseFunctionExample/firebaseFunctionExample.js'

// https://firebase.google.com/docs/functions/get-started
// https://console.firebase.google.com/project/projectname/functions

export const firebaseFunctionExample = onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', appConfig.siteInfo.domain)

  let payload: any = {}

  try {
    payload = JSON.parse(req.body)
  } catch (e) {
    payload = req.body
  }

  try {
    const data = await firebaseFunctionExample_firebase(payload)
    res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    console.error(new Error(error))
    res.status(200).json({
      error: error.toString(),
    })
  }
})
