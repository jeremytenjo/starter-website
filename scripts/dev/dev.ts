import chalk from 'chalk'

import getIpAddress from '../../devtools/utils/node/getIpAddress.js'
import shell from '../../devtools/utils/node/shell.js'
import getCommandLineArgs from '../../devtools/utils/node/getCommandLineArgs.js'
import appConfig from '../../app.config.js'

import devScriptArgs from './handlers/devScriptArgs/devScriptArgs.js'

export default async function dev() {
  console.clear()
  const ipAddress = getIpAddress()

  console.log('')
  console.log(chalk.cyan('Nextjs'))
  console.log('')

  console.log(`${chalk.green('network')} - http://${ipAddress}:${appConfig.nextjs.port}`)

  // args
  const scriptArgs = getCommandLineArgs([
    { name: 'dataSource', type: String },
    {
      name: 'onlyApp',
      type: Boolean,
    },
    {
      name: 'withArgs',
      type: Boolean,
    },
  ])
  const dataSource = scriptArgs.dataSource || 'dev'

  const commands = [
    `DATA_SOURCE=${dataSource} node --experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev -p ${appConfig.nextjs.port}`,
  ]

  if (!scriptArgs.onlyApp) {
    commands.push('npm run storybook:dev')
  }

  if (scriptArgs.withArgs) {
    const command = await devScriptArgs()
    command && commands.push(command)
  }

  shell(commands)
}
