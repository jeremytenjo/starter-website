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

    console.log('User creation was successful')
    return createdUser.uid
  } catch (error) {
    console.log(error, 'User creation failed')
  }
}
