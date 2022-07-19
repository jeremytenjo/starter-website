import path from 'path'

import createFile from '../../../../../utils/node/createFile.js'
import prettifyFile from '../../../../../utils/node/prettifyFile/prettifyFile.js'
import helpers from '../../handlers/fileProphelpers/fileProphelpers.cjs'

export type FileProps = {
  name: string
  helpers: any
  folderPath: string
}

export type GenCodeFromTemplateProps = {
  name: string
  outputPath: string
  files: {
    parentFolderName?: (props: FileProps) => string
    path: (props: FileProps) => string
    template: (props: FileProps) => string
  }[]
}

export default async function genCodeFromTemplate({
  files,
  name,
  outputPath = '',
}: GenCodeFromTemplateProps) {
  try {
    const fileProperties: FileProps = {
      name: name.replaceAll(' ', ''),
      helpers,
      folderPath: outputPath,
    }

    await Promise.all(
      files.map(async (file) => {
        const parentFolderName = (
          file?.parentFolderName?.(fileProperties) ||
          name ||
          ''
        ).replaceAll(' ', '')

        const filePath = path.join(
          outputPath,
          parentFolderName,
          file.path(fileProperties),
        )
        const fileContent = prettifyFile({
          content: file.template(fileProperties),
        })

        await createFile({
          filePath: filePath,
          fileContent,
          noTimestamp: true,
          nojs: true,
        })
      }),
    )
  } catch (error) {
    console.log({ error })
  }
}