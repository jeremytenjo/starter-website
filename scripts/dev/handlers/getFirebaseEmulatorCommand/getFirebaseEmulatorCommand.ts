import type { CommandProps } from '../../../../devtools/utils/terminal/shellDashboard'
import appConfig from '../../../../app.config.cjs'
import shell from '../../../../devtools/utils/node/shell.js'

export type GetFirebaseEmulatorCommandProps = {
  emulatorPorts: number[]
  devScriptArgs: any
}

export default async function getFirebaseEmulatorCommand(
  props: GetFirebaseEmulatorCommandProps,
): Promise<CommandProps | false> {
  if (!appConfig.firebase.enabled) return false

  const firebaseJson: any = (
    await import('../../../../firebase.json', {
      assert: { type: 'json' },
    })
  ).default

  const addFirestoreData = firebaseJson?.emulators?.firestore?.port
  const addAuthData = firebaseJson?.emulators?.auth?.port
  const enableEmulatedFunctions = firebaseJson?.emulators?.functions?.port
  const enableFirebaseStorage = firebaseJson?.emulators?.storage?.port

  const startAuthEmulator = Boolean(addAuthData) && props.devScriptArgs.signedIn
  // https://firebase.google.com/docs/emulator-suite/install_and_configure#startup
  let commandArgs = 'emulators:start --only'

  if (addFirestoreData) {
    commandArgs = `${commandArgs} firestore`
  }

  if (startAuthEmulator) {
    commandArgs = `${commandArgs},auth`
  }

  if (enableEmulatedFunctions) {
    commandArgs = `${commandArgs},functions`
  }

  if (enableFirebaseStorage) {
    commandArgs = `${commandArgs},storage`
  }

  return {
    label: `Firebase Emulators`,
    command: {
      root: 'firebase',
      args: commandArgs,
    },
    ports: props.emulatorPorts,
    color: '#FF825A',
    onCommandRunning: async () => {
      const addEmulatorData = await import('../addEmulatorData/addEmulatorData.js')
      addEmulatorData.default({ addAuth: startAuthEmulator })
      shell('npm run functions:dev')
    },
  }
}

export type GetFirebaseEmulatorCommandReturn = ReturnType<
  typeof getFirebaseEmulatorCommand
>
