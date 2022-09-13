import path from 'path'

import appConfig from '../../app.config.js'
import firebaseJson from '../../firebase.json' assert { type: 'json' }
import shellDashboard, {
  type CommandProps,
} from '../../devtools/utils/terminal/shellDashboard.js'
import readFile from '../../devtools/utils/node/readFile.js'

import getDevScriptArgs from './handlers/getDevScriptArgs/getDevScriptArgs.js'

const addFirestoreData = firebaseJson?.emulators?.firestore?.port
const addAuthData = firebaseJson?.emulators?.auth?.port

export default async function dev() {
  const devScriptArgs = await getDevScriptArgs()
  const emulatorPorts: number[] = []
  const waitForPortsMessage = 'Waiting for emulator data'

  const firebaserc = await readFile(path.join(process.cwd(), '.firebaserc'))
  const noProjectDefinedInFirebaserc = firebaserc.includes('""')
  for (const [, value] of Object.entries(firebaseJson.emulators)) {
    emulatorPorts.push(value.port)
  }

  const startFirebaseEmulators = !noProjectDefinedInFirebaserc && firebaseJson.emulators
  const waitForPorts = startFirebaseEmulators
    ? {
        ports: emulatorPorts,
        message: waitForPortsMessage,
      }
    : undefined

  const commands: CommandProps[] = [
    // nextjs
    {
      label: 'Nextjs',
      command: {
        root: 'node',
        args: `--experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev -p ${appConfig.nextjs.port}`,
        env: {
          DATA_SOURCE: devScriptArgs.dataSource,
        },
      },
      ports: [appConfig.nextjs.port],
      color: '#01BF81',
      // enableQRCode: true,
      waitForPorts,
    },

    // storybok
    {
      label: `Storybook`,
      command: {
        root: 'npm',
        args: 'run storybook:dev',
      },
      ports: [appConfig.devtools.storybook.port],
      color: '#FF4785',
      // enableQRCode: true,
      waitForPorts,
    },
  ]

  // firebase emulator
  if (startFirebaseEmulators) {
    if (!emulatorPorts.length) {
      throw new Error('Missing emulator ports in firebase.json')
    }

    const startAuthEmulator = Boolean(addAuthData) && devScriptArgs.signedIn
    let commandArgs = 'emulators:start --only'

    if (addFirestoreData) {
      commandArgs = `${commandArgs} firestore`
    }

    if (startAuthEmulator) {
      commandArgs = `${commandArgs},auth`
    }

    commands.push({
      label: `Firebase Emulators`,
      command: {
        root: 'firebase',
        args: commandArgs,
      },
      ports: emulatorPorts,
      color: '#FFCB2E',
      onCommandRunning: async () => {
        const addEmulatorData = await import(
          './handlers/addEmulatorData/addEmulatorData.js'
        )
        addEmulatorData.default({ addAuth: startAuthEmulator })
      },
    })
  }

  // run commands
  shellDashboard({ commands })
}
