import path from 'path'

import appConfig from '../../app.config.cjs'
import firebaseJson from '../../firebase.json' assert { type: 'json' }
import shellDashboard, {
  type CommandProps,
} from '../../devtools/utils/terminal/shellDashboard.js'
import readFile from '../../devtools/utils/node/readFile.js'

import getDevScriptArgs from './handlers/getDevScriptArgs/getDevScriptArgs.js'
import generatePrismicTypes from './handlers/generatePrismicTypes/generatePrismicTypes.js'
import log from '../../devtools/utils/node/log.js'

export default async function dev() {
  const devScriptArgs = await getDevScriptArgs()
  const emulatorPorts: number[] = []
  const waitForPortsMessage = 'Waiting for emulator data'

  const firebaserc = await readFile(path.join(process.cwd(), '.firebaserc'))
  const noProjectDefinedInFirebaserc = firebaserc.includes('""')
  for (const [, value] of Object.entries(firebaseJson.emulators)) {
    emulatorPorts.push(value.port)
  }

  const startApp = true
  const startStorybook = !devScriptArgs.onlyApp
  const startFirebaseEmulators =
    !noProjectDefinedInFirebaserc && firebaseJson.emulators && !devScriptArgs.onlyApp
  const waitForPorts = startFirebaseEmulators
    ? {
        ports: emulatorPorts,
        message: waitForPortsMessage,
      }
    : undefined

  const commands: CommandProps[] = []

  // prismic
  try {
    const prismicConfig = await import('../../src/services/prismic/prismic.config.js')
    if (prismicConfig.default.accessToken) generatePrismicTypes()
  } catch (error) {}

  // nextjs
  if (startApp) {
    const nextjsCommand = {
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
      waitForPorts,
    }
    commands.push(nextjsCommand)
  }

  // storybok
  if (startStorybook) {
    const storybookCommand = {
      label: `Storybook`,
      command: {
        root: 'npm',
        args: 'run storybook:dev',
      },
      ports: [appConfig.devtools.storybook.port],
      color: '#FF4785',
      waitForPorts,
    }
    commands.push(storybookCommand)
  }

  // firebase emulator
  if (startFirebaseEmulators) {
    if (!emulatorPorts.length) {
      throw new Error('Missing emulator ports in firebase.json')
    }
    try {
      const getFirebaseCommand = (
        await import(
          './handlers/getFirebaseEmulatorCommand/getFirebaseEmulatorCommand.js'
        )
      ).default
      const firebaseCommand = await getFirebaseCommand({
        devScriptArgs,
        emulatorPorts,
      })
      firebaseCommand && commands.push(firebaseCommand)
    } catch (error) {
      log(`Error running getFirebaseCommand - ${String(error)}`, {
        error: true,
      })
    }
  }

  // run commands
  shellDashboard({ commands })
}
