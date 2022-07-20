import path from 'path'

import createFile from '../../../../../utils/node/createFile.js'
import prettifyFile from '../../../../../utils/node/prettifyFile/prettifyFile.js'
import helpers from '../../handlers/fileProphelpers/fileProphelpers.cjs'
import prettierConfig from '../../../../../prettier/prettier.config.json' assert { type: 'json' }

export type FileProps = {
  name: string
  helpers: any
  folderPath: string
  slots: any
}

export type GenCodeFromTemplateProps = {
  name: string
  outputPath: string
  noParentFolder?: boolean
  slots?: any
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
  noParentFolder,
  slots = {},
}: GenCodeFromTemplateProps) {
  try {
    const fileProperties: FileProps = {
      name: name.replaceAll(' ', ''),
      helpers,
      folderPath: outputPath,
      slots,
    }

    await Promise.all(
      files.map(async (file) => {
        const parentFolderName = !noParentFolder
          ? (file?.parentFolderName?.(fileProperties) || name || '').replaceAll(' ', '')
          : ''

        const filePath = path.join(
          outputPath,
          parentFolderName,
          file.path(fileProperties),
        )
        const fileContent = prettifyFile({
          content: file.template(fileProperties),
          prettierConfig,
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
