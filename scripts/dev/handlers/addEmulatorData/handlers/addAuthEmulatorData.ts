import log from '../../../../../devtools/utils/node/log.js'

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_auth)
 */
export default async function addAuthEmulatorData({ auth }) {
  try {
    // https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
    const createdUser = await auth.createUser({
      email: 'user@example.com',
      password: 'secretPassword',
      emailVerified: true,
      displayName: 'John Doe',
      phoneNumber: '+11234567890',
      photoURL: 'https://www.jeremytenjo.com/images/profile_photo.webp',
    })

    log('User creation was successful', { success: true })
    return createdUser.uid
  } catch (error) {
    log(error, {
      error: true,
    })
  }
}
