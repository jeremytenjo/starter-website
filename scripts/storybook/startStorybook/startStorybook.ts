import path from 'path'

import shell from '../../../devtools/utils/node/shell.js'
import appConfig from '../../../app.config.js'

import generateStoriesList from './handlers/generateStoriesList/generateStoriesList.js'

export default async function startStorybook() {
  const storybookPath = path.join(process.cwd(), 'devtools', 'storybook')
  const port = appConfig.devtools.storybook.port
  const nextPort = appConfig.nextjs.port

  const payload: PayloadTypes = {
    storybookPath,
  }

  await generateStoriesList(payload)

  shell([
    {
      command: `start-storybook -p ${port} -c ./devtools/storybook --no-open --quiet`,
      name: 'deploy',
      env: { STORYBOOK_NEXT_PORT: nextPort },
    },
  ])
}

export type PayloadTypes = {
  storybookPath: string
}
