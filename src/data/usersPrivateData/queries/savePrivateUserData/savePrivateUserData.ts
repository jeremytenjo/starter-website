import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../../../lib/integrations/Google/Firebase/firebase'

import assert from '../../../../lib/utils/misc/assert/assert'
import type UsersPrivateDatumSchema from '../../usersPrivateDatum.schema'

export type SavePrivateUserDataProps = {
  uid: string
  privateUserData: Partial<UsersPrivateDatumSchema>
}

export default async function savePrivateUserData(props: SavePrivateUserDataProps) {
  assert({
    condition: props.privateUserData && props.uid,
    name: 'privateUserData, id',
  })
  await setDoc(doc(db, 'usersPrivateData', props.uid), props.privateUserData, {
    merge: true,
  })
}

export type SavePrivateUserDataReturn = ReturnType<typeof savePrivateUserData>
