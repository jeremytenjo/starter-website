import admin from 'firebase-admin'

import firebaseJson from '../../../../firebase.json' assert { type: 'json' }
import firebaseConfig from '../../../../src/services/google/firebase/firebase.config.js'

import addMockDataToFirestore from './handlers/addFirestoreEmulatorData.js'
import addAuthEmulatorData from './handlers/addAuthEmulatorData.js'

const addFirestoreData = firebaseJson?.emulators?.firestore?.port
const addAuthData = firebaseJson?.emulators?.auth?.port

// https://firebase.google.com/docs/emulator-suite/connect_firestore
addFirestoreData &&
  (process.env.FIRESTORE_EMULATOR_HOST = `localhost:${firebaseJson?.emulators.firestore.port}`)

// https://firebase.google.com/docs/emulator-suite/connect_auth
addAuthData &&
  (process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${firebaseJson?.emulators.auth.port}`)

admin.initializeApp(firebaseConfig)

const db = admin.firestore()
const auth = admin.auth()

type AddEmulatorDataProps = {
  addAuth: boolean
}

export default async function addEmulatorData(props: AddEmulatorDataProps) {
  if (!addFirestoreData && !addAuthData) {
    return
  }

  let command = 'firebase emulators:start --only'
  if (addFirestoreData) {
    command = `${command} firestore`
  }

  if (addAuthData) {
    command = `${command},auth`
  }

  const createdUserId = props.addAuth ? await addAuthEmulatorData({ auth }) : 'null'

  addFirestoreData && (await addMockDataToFirestore({ db, createdUserId }))

  return command
}
