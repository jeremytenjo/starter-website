import fs from 'fs-extra'
import prettier from 'prettier'

import prettierConfig from '../../prettier/prettier.config.json' assert { type: 'json' }

import doesFolderOrFileExist from './doesFolderOrFileExist.js'

type Props = {
  filePath: string
  fileContent: string
  nojs?: boolean
  noTimestamp?: boolean
  overwrite?: boolean
}

export default async function createFile({
  filePath,
  fileContent,
  nojs,
  noTimestamp,
  overwrite = false,
}: Props) {
  const exists = await doesFolderOrFileExist(filePath)

  if (exists && !overwrite) {
    return
  }

  const formateed = nojs
    ? fileContent
    : prettier.format(noTimestamp ? fileContent : addTimestamp(fileContent), {
        ...(prettierConfig as any),
        parser: 'babel',
      })

  fs.outputFileSync(filePath, formateed, (err) => {
    if (err) throw err
  })
}

const addTimestamp = (fileContent) => {
  const fileContentWithTimestamp = `
  /**
 * DON'T EDIT THIS FILE
 * This file is auto generated
 */
  
  ${fileContent}
  `
  return fileContentWithTimestamp
}
