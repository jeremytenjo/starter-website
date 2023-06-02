import React from 'react'
import { FirebaseProvider } from '@useweb/firebase/useFirebase'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
// import { getStorage, connectStorageEmulator } from 'firebase/storage'

import firebaseJson from '../../../../../firebase.json'
import firebaseConfig from './firebase.config'

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
// export const storage = getStorage(firebaseApp)

const envIsDev = process.env.NODE_ENV === 'development'

if (envIsDev) {
  connectFirestoreEmulator(db, 'localhost', firebaseJson.emulators.firestore.port)
  connectAuthEmulator(auth, `http://localhost:${firebaseJson.emulators.auth.port}`)
  // connectStorageEmulator(storage, 'localhost', firebaseJson.emulators.storage.port)
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
