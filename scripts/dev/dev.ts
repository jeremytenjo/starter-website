import chalk from 'chalk'

import getIpAddress from '../../devtools/utils/node/getIpAddress.js'
import shell from '../../devtools/utils/node/shell.js'
import appConfig from '../../app.config.js'

import getDevScriptArgs from './handlers/getDevScriptArgs/getDevScriptArgs.js'
import addEmulatorData from './handlers/addEmulatorData/addEmulatorData.js'

export default async function dev() {
  console.clear()
  const ipAddress = getIpAddress()
  // args
  const devScriptArgs = await getDevScriptArgs()

  const commands = [
    `DATA_SOURCE=${devScriptArgs.dataSource} node --experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev -p ${appConfig.nextjs.port}`,
  ]

  if (!devScriptArgs.onlyApp) {
    commands.push('npm run storybook:dev')
  }

  const emulatorCommand = await addEmulatorData({ addAuth: devScriptArgs.signedIn })

  if (emulatorCommand) {
    commands.push(emulatorCommand)
  }

  console.log('')
  console.log(chalk.cyan('Nextjs'))
  console.log('')

  console.log(`${chalk.green('network')} - http://${ipAddress}:${appConfig.nextjs.port}`)

  shell(commands)
}
