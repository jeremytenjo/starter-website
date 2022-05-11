import chalk from 'chalk'
import qrCode from 'qrcode-terminal'

import shell from '../../../utils/node/shell.js'
import getIpAddress from '../../../utils/node/getIpAddress.js'

export default function startLadle() {
  const port = 61000
  const ipAddress = getIpAddress()
  const networkUrl = `http://${ipAddress}:${port}`

  console.log()
  console.log(`${chalk.green('network')} - ${networkUrl}`)
  console.log()
  qrCode.generate(networkUrl, {
    small: true,
  })

  shell(`ladle serve --config ./devtools/ladle --open none --port ${port}`)
}
