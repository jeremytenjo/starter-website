import path from 'path'

import esbuild from 'esbuild'

import removeFolder from '../../../../utils/node/removeFolder.cjs'
import createFile from '../../../../utils/node/createFile.js'

import getEntryPoints from './handlers/getEntryPoints.js'

export default async function buildPlayWright() {
  const playwrightDir = path.join(process.cwd(), 'devtools/testing/playwright')

  await removeFolder(path.join(playwrightDir, 'build'))

  const { entryPoints } = await getEntryPoints({ playwrightDir })

  const outdir = path.join(playwrightDir, 'build')

  // https://esbuild.github.io/api/
  await esbuild.build({
    entryPoints,
    outdir,
    platform: 'node',
    bundle: true,
    minify: true,
    format: 'cjs',
    target: ['es2017'],
    watch: false,
    external: ['esbuild', '@playwright/test'],
  })

  createFile({
    filePath: path.join(outdir, 'package.json'),
    fileContent: '{"type": "commonjs"}',
    nojs: true,
  })
}
