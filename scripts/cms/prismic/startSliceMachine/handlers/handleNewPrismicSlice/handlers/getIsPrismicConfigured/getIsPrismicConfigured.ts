import path from 'path'

import doesFolderOrFileExist from '../../../../../../../../devtools/utils/node/doesFolderOrFileExist.js'
import log from '../../../../../../../../devtools/utils/node/log.js'

export type IsPrismicConfiguredProps = { name: string }

export default async function getIsPrismicConfigured() {
  let isPrismicConfigured = false

  const prismicConfigExists = doesFolderOrFileExist(
    path.join(process.cwd(), 'src/services/prismic/prismic.config.ts'),
  )
  if (prismicConfigExists) {
    const prismicConfig = await import(
      '../../../../../../../../src/services/prismic/prismic.config.js'
    )
    const accessToken = Boolean(prismicConfig.default.accessToken)
    if (!accessToken) {
      log('Missing accessToken in prismic.config.ts', { error: true })
    }
    isPrismicConfigured = Boolean(prismicConfig.default.accessToken)
  }

  return { isPrismicConfigured }
}

export type IsPrismicConfiguredReturn = ReturnType<typeof getIsPrismicConfigured>
