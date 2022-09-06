import path from 'path'

import qrCode from 'qrcode-terminal'
import chalk from 'chalk'

import getIpAddress from '../../../devtools/utils/node/getIpAddress.js'
import shell from '../../../devtools/utils/node/shell.js'
import appConfig from '../../../app.config.cjs'

import generateStoriesList from './handlers/generateStoriesList/generateStoriesList.js'

export default async function startStorybook() {
  const storybookPath = path.join(process.cwd(), 'devtools', 'storybook')
  const port = appConfig.devtools.storybook.port
  const nextPort = appConfig.nextjs.port
  const ipAddress = getIpAddress()
  const networkUrl = `http://${ipAddress}:${port}`

  console.log('')
  console.log(chalk.cyan('Storybook'))
  console.log('')

  qrCode.generate(networkUrl, {
    small: true,
  })

  const payload: PayloadTypes = {
    storybookPath,
  }

  await generateStoriesList(payload)

  // await shell('rm -rf node_modules/.cache/storybook')

  shell([
    {
      // command: `start-storybook -p ${port} -c ./devtools/storybook --no-open --quiet --no-manager-cache`,
      command: `start-storybook -p ${port} -c ./devtools/storybook --no-open --quiet`,
      name: 'deploy',
      env: { STORYBOOK_NEXT_PORT: nextPort },
    },
  ])
}

export type PayloadTypes = {
  storybookPath: string
}
