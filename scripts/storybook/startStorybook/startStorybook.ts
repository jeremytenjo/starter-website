import qrCode from 'qrcode-terminal'
import chalk from 'chalk'

import getIpAddress from '../../../devtools/utils/node/getIpAddress.js'
import shell from '../../../devtools/utils/node/shell.js'
import appConfig from '../../../app.config.cjs'

// in scripts instad of devtoosl/storyboo/scipts because of the pacakge commonjs
export default function startStorybook() {
  const port = appConfig.devtools.storybook.port
  const ipAddress = getIpAddress()
  const networkUrl = `http://${ipAddress}:${port}`

  console.log('')
  console.log(chalk.cyan('Storybook'))
  console.log('')

  qrCode.generate(networkUrl, {
    small: true,
  })

  shell(
    `start-storybook -p ${port} -c ./devtools/storybook --no-open --quiet --no-manager-cache`,
  )
}
