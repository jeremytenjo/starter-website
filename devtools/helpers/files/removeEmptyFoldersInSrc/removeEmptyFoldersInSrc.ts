import path from 'path'

import removeEmptyFolders from '../../../utils/node/removeEmptyFolders/removeEmptyFolders.js'

export default async function removeEmptyFoldersInSrc() {
  const srcPath = path.join(process.cwd(), 'src')

  await removeEmptyFolders({
    folderPath: srcPath,
  })

  console.log('Removed empty folders')
}
