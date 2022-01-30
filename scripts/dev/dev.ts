import chalk from 'chalk'

import getIpAdress from '../../devtools/utils/node/getIpAdress.js'
import shell from '../../devtools/utils/node/shell.js'
import setType from '../../devtools/utils/pkgJson/setType/setType.cjs'

export default function dev() {
  console.clear()

  const ipAdress = getIpAdress()

  console.log(`${chalk.green('network')} - http://${ipAdress}:3000`)

  // TODO remove setType when https://github.com/vercel/next.js/pull/33637 is merged
  setType({ type: 'commonjs' })

  shell('node_modules/.bin/next dev')
}
