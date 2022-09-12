import admin from 'firebase-admin'

import appConfig from '../../../../../../app.config.js'

import addMockDataToFirestore from './handlers/addFirestoreEmulatorData.js'
import addAuthEmulatorData from './handlers/addAuthEmulatorData.js'

const addFirestoreData = appConfig?.firebase?.emulators?.firestore?.port
const addAuthData = appConfig?.firebase?.emulators?.auth?.port

// https://firebase.google.com/docs/emulator-suite/connect_firestore
addFirestoreData &&
  (process.env.FIRESTORE_EMULATOR_HOST = `localhost:${appConfig?.firebase.emulators.firestore.port}`)

// https://firebase.google.com/docs/emulator-suite/connect_auth
addAuthData &&
  (process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${appConfig?.firebase.emulators.auth.port}`)

admin.initializeApp(appConfig.firebase.config)

const db = admin.firestore()
const auth = admin.auth()

type AddEmulatorDataProps = {
  addAuth: boolean
}

export default async function addEmulatorData(props: AddEmulatorDataProps) {
  const createdUserId = props.addAuth ? await addAuthEmulatorData({ auth }) : 'null'

  addFirestoreData && (await addMockDataToFirestore({ db, createdUserId }))
}
