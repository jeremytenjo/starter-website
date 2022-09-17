import React from 'react'
import { FirebaseProvider } from '@useweb/firebase/useFirebase'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { connectFirestoreEmulator } from 'firebase/firestore'

import firebaseJson from '../../../../../firebase.json'
import firebaseConfig from '../../../../services/google/firebase/firebase.config'

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const envIsDev = process.env.NODE_ENV === 'development'

if (envIsDev) {
  connectFirestoreEmulator(db, 'localhost', firebaseJson.emulators.firestore.port)
}

export default function Firebase({ children }) {
  return (
    <FirebaseProvider
      firebaseConfig={firebaseConfig}
      firebaseApp={firebaseApp}
      envIsDev={envIsDev}
      db={db}
      dbOptions={{
        disableEmulatorConnection: true,
      }}
    >
      {children}
    </FirebaseProvider>
  )
}
