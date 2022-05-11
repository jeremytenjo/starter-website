import chalk from 'chalk'

import getIpAddress from '../../devtools/utils/node/getIpAddress.js'
import shell from '../../devtools/utils/node/shell.js'
import getCommandLineArgs from '../../devtools/utils/node/getCommandLineArgs.js'

export default function dev() {
  console.clear()
  const ipAdress = getIpAddress()
  console.log(`${chalk.green('network')} - http://${ipAdress}:3000`)

  // args
  const scriptArgs = getCommandLineArgs([
    { name: 'dataSource', type: String },
    {
      name: 'onlyApp',
      type: Boolean,
    },
  ])
  const dataSource = scriptArgs.dataSource || 'dev'

  const commands = [`DATA_SOURCE=${dataSource} node_modules/.bin/next dev`]

  if (!scriptArgs.onlyApp) {
    commands.push('npm run ladle:dev')
  }

  shell(commands)
}
