import path from 'path'

import glob from '../../../../../../../devtools/utils/node/glob.js'

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
  const mockDatabaseCollections = await getCollectionsData()

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
            userId: createdUserId,
            ...collectionData,
          })
        } else {
          db.collection(collection.name).add(collectionData)
        }
      })
    })

    console.log('Database seed was successful')
  } catch (error) {
    console.log(error, 'Database seed failed')
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

      return {
        name,
        data,
      }
    }),
  )

  return collections
}
