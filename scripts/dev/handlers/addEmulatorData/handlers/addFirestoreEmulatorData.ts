import path from 'path'

import glob from '../../../../../devtools/utils/node/glob.js'
import log from '../../../../../devtools/utils/node/log.js'

export type CollectionType = {
  name: string
  data: any[]
}

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore)
 */
export default async function addFirestoreEmulatorData({ db }) {
  const mockDatabaseCollections: CollectionType[] = await getCollectionsData()
  const collectionsList = mockDatabaseCollections.map((c) => c.name).join(', ')

  try {
    mockDatabaseCollections.map((collection: CollectionType) => {
      collection.data.map((collectionData) => {
        if (collection.name === 'users') {
          db.collection(collection.name).doc(collectionData.uid).set(collectionData)
        } else {
          db.collection(collection.name).add(collectionData)
        }
      })
    })

    log(`Firestore emulator: Created collections ${collectionsList}`, { success: true })
    console.log('')
  } catch (error) {
    log(error, {
      error: true,
    })
  }
}

async function getCollectionsData() {
  const pattern = path.join(process.cwd(), 'src', 'data', '**', '*.stubs.ts')
  const stubsData = await glob({
    pattern,
  })

  const collections: CollectionType[] = await Promise.all(
    stubsData.map(async (stubPath) => {
      const [name] = stubPath.split('/').pop()?.split('.') || []
      const { default: data } = await import(stubPath)
      // documents with uid property are replaced with emulator user id
      const setUserIdToDataFromSignedInUser = Object.keys(data?.[0] || {})?.includes(
        'userId',
      )

      return {
        name,
        data,
        setUserIdToDataFromSignedInUser,
      }
    }),
  )

  return collections
}
