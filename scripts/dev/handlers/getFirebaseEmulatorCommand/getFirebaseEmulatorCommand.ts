import type { CommandProps } from '../../../../devtools/utils/terminal/shellDashboard'
import appConfig from '../../../../app.config.cjs'

export type GetFirebaseEmulatorCommandProps = {
  emulatorPorts: number[]
  devScriptArgs: any
}

export default async function getFirebaseEmulatorCommand(
  props: GetFirebaseEmulatorCommandProps,
): Promise<CommandProps | false> {
  if (!appConfig.firebase.enabled) return false

  const firebaseJson = (
    await import('../../../../firebase.json', {
      assert: { type: 'json' },
    })
  ).default
  const addFirestoreData = firebaseJson?.emulators?.firestore?.port
  const addAuthData = firebaseJson?.emulators?.auth?.port
  const enableEmulatedFunctions = firebaseJson?.emulators?.functions?.port

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
    },
  }
}

export type GetFirebaseEmulatorCommandReturn = ReturnType<
  typeof getFirebaseEmulatorCommand
>
