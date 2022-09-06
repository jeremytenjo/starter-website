import path from 'path'

import glob from '../../../../../devtools/utils/node/glob.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'
import { PayloadTypes } from '../../startStorybook'

export default async function generateStoriesList(payload: PayloadTypes) {
  const storiesWithFullPaths = await glob({
    pattern: `${process.cwd()}/src/**/stories/*stories.@(tsx|ts)`,
    options: {
      ignore: '**/node_modules/**',
    },
  })

  const stories = storiesWithFullPaths.map((storyFullPath) => {
    return storyFullPath.replace(process.cwd(), '../..')
  })

  const storiesListPath = path.join(payload.storybookPath, 'storiesList.cjs')
  const storiesListContent = `module.exports = ${JSON.stringify(stories)}`

  await createFile({
    filePath: storiesListPath,
    fileContent: storiesListContent,
    overwrite: true,
  })
}
