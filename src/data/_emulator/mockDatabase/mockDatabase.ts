import users from '../../_users/users.stubs.js'
import type { CollectionType } from '../../../../scripts/dev/handlers/devScriptArgs/handlers/addEmulatorData/handlers/addFirestoreEmulatorData'

// used by src/services/firebase/emulator/addEmulatorData/handlers/addFirestoreEmulatorData.ts
const mockDatabase: CollectionType[] = [
  {
    name: 'users',
    data: users,
  },
]

export default mockDatabase
