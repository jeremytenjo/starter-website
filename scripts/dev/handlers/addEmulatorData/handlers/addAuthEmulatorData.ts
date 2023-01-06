import usersStubs from '../../../../../src/data/users/users.stubs.js'
import log from '../../../../../devtools/utils/node/log.js'

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_auth)
 */
export default async function addAuthEmulatorData({ auth }) {
  try {
    const createdUserNames = usersStubs.map((c) => c.displayName).join(', ')

    // https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
    await Promise.all(
      usersStubs.map(async (stubUser) => {
        await auth.createUser({
          ...stubUser,
          password: 'password',
        })
      }),
    )

    log(`Auth emulator: Created users ${createdUserNames}`, { success: true })
  } catch (error) {
    log(error, {
      error: true,
    })
  }
}
