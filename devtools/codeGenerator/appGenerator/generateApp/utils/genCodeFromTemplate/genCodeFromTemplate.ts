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
    path: (props: FileProps) => string
    template: (props: FileProps) => string
  }[]
}

export default async function genCodeFromTemplate({
  files,
  name,
  outputPath = '',
}: GenCodeFromTemplateProps) {
  const fileProperties: FileProps = {
    name,
    helpers,
    folderPath: outputPath,
  }

  try {
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(outputPath, name, file.path(fileProperties))
        const fileContent = prettifyFile({
          content: file.template(fileProperties),
        })

        await createFile({
          filePath: filePath,
          fileContent,
          noTimestamp: true,
        })
      }),
    )
  } catch (error) {
    console.log({ error })
  }
}
