import shell from '../../../devtools/utils/node/shell.js'
import appConfig from '../../../app.config.js'

export default async function startStorybook() {
  const port = appConfig.devtools.storybook.port
  const nextPort = appConfig.nextjs.port

  shell([
    {
      command: `storybook dev -p ${port} -c ./devtools/storybook --no-open --quiet`,
      name: 'start storybook script',
      env: { STORYBOOK_NEXT_PORT: nextPort },
    },
  ])
}

export type PayloadTypes = {
  storybookPath: string
}
