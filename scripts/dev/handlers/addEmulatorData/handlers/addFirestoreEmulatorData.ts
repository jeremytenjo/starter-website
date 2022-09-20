import path from 'path'

import glob from '../../../../../devtools/utils/node/glob.js'
import log from '../../../../../devtools/utils/node/log.js'

export type CollectionType = {
  name: string
  data: any[]
  documentIdIsCreatedUserId?: boolean
  setUserIdToDataFromSignedInUser?: boolean
}

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore)
 */
export default async function addMockDataToFirestore({ db, createdUserId }) {
  const mockDatabaseCollections: CollectionType[] = await getCollectionsData()
  const collectionsList = mockDatabaseCollections.map((c) => c.name).join(', ')

  try {
    mockDatabaseCollections.map((collection: CollectionType) => {
      collection.data.map((collectionData) => {
        // https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
        if (collection.documentIdIsCreatedUserId) {
          db.collection(collection.name).doc(createdUserId).set(collectionData)
        }
        // add userId property to document
        else if (collection.setUserIdToDataFromSignedInUser) {
          db.collection(collection.name).add({
            ...collectionData,
            userId: createdUserId,
          })
        } else {
          db.collection(collection.name).add(collectionData)
        }
      })
    })

    log(`Collections added to firestore emulator: ${collectionsList}`)
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
      // documents with userId property are replaced with emulator user id
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