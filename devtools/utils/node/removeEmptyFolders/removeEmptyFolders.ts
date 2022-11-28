import path from 'path'
import fsPromises from 'fs/promises'

export type RemoveEmptyFoldersProps = { folderPath: string }

export default async function removeEmptyFolders(props: RemoveEmptyFoldersProps) {
  // lstat does not follow symlinks (in contrast to stat)
  const fileStats = await fsPromises.lstat(props.folderPath)
  if (!fileStats.isDirectory()) {
    return
  }
  let fileNames = await fsPromises.readdir(props.folderPath)
  if (fileNames.length > 0) {
    const recursiveRemovalPromises = fileNames.map((fileName) =>
      removeEmptyFolders({
        folderPath: path.join(props.folderPath, fileName),
      }),
    )
    await Promise.all(recursiveRemovalPromises)

    // re-evaluate fileNames; after deleting subdirectory
    // we may have parent directory empty now
    fileNames = await fsPromises.readdir(props.folderPath)
  }

  if (fileNames.length === 0) {
    await fsPromises.rmdir(props.folderPath)
  }
}
