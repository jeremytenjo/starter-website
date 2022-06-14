import chalk from 'chalk'

import getIpAddress from '../../devtools/utils/node/getIpAddress.js'
import shell from '../../devtools/utils/node/shell.js'
import getCommandLineArgs from '../../devtools/utils/node/getCommandLineArgs.js'

export default function dev() {
  console.clear()
  const ipAddress = getIpAddress()

  console.log('')
  console.log(chalk.cyan('Nextjs'))
  console.log('')

  console.log(`${chalk.green('network')} - http://${ipAddress}:3000`)

  // args
  const scriptArgs = getCommandLineArgs([
    { name: 'dataSource', type: String },
    {
      name: 'onlyApp',
      type: Boolean,
    },
  ])
  const dataSource = scriptArgs.dataSource || 'dev'

  const commands = [
    `DATA_SOURCE=${dataSource} node --experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev`,
  ]

  if (!scriptArgs.onlyApp) {
    commands.push('npm run storybook:dev')
  }

  shell(commands)
}
