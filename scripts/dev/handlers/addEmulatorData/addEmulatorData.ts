import path from 'path'

import admin from 'firebase-admin'

import firebaseJson from '../../../../firebase.json' assert { type: 'json' }
import firebaseConfig from '../../../../src/services/google/firebase/firebase.config.js'
import readFile from '../../../../devtools/utils/node/readFile.js'

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

// Add a project id to .firebaserc to use firebase emulator
export default async function addEmulatorData(props: AddEmulatorDataProps) {
  const firebaserc = await readFile(path.join(process.cwd(), '.firebaserc'))
  const noProjectDefinedInFirebaserc = firebaserc.includes('""')

  if ((!addFirestoreData && !addAuthData) || noProjectDefinedInFirebaserc) {
    return
  }

  const createdUserId = props.addAuth ? await addAuthEmulatorData({ auth }) : 'null'

  addFirestoreData && (await addMockDataToFirestore({ db, createdUserId }))
}
