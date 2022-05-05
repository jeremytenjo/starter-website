import path from 'path'

import type { BuildOptions } from 'esbuild'

import glob from '../../../../../utils/node/glob.js'

type GetEntryPointsReturn = {
  entryPoints: BuildOptions['entryPoints']
}

export default async function getEntryPoints({
  playwrightDir,
}): Promise<GetEntryPointsReturn> {
  const pattern = path.join(playwrightDir, '**/*.*')
  const ignore = [
    path.join(playwrightDir, 'build/**'),
    path.join(playwrightDir, 'scripts/**'),
  ]

  const entryPoints = (await glob({
    pattern,
    options: {
      ignore,
    },
  })) as GetEntryPointsReturn['entryPoints']

  return { entryPoints }
}
