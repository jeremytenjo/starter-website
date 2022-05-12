import chalk from 'chalk'
import qrCode from 'qrcode-terminal'

import shell from '../../../utils/node/shell.js'
import getIpAddress from '../../../utils/node/getIpAddress.js'
import ladleConfig from '../../config.mjs'

export default function startLadle() {
  const ipAddress = getIpAddress()
  const networkUrl = `http://${ipAddress}:${ladleConfig.serve.port}`

  console.log()
  console.log(`${chalk.green('network')} - ${networkUrl}`)
  console.log()
  qrCode.generate(networkUrl, {
    small: true,
  })

  shell(`ladle serve --config ./devtools/ladle`)
}
