import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import createFile from '../../../utils/node/createFile.js'
import doesFolderOrFileExist from '../../../utils/node/doesFolderOrFileExist.js'

import glob from '../../../utils/node/glob.js'

export default async function generateBlurredPublicImagesCopies() {
  const imagesPathsPngs = await glob({
    pattern: path.join(process.cwd(), 'public/images', '**', '*.png'),
  })
  const imagesPathsJpeg = await glob({
    pattern: path.join(process.cwd(), 'public/images', '**', '*.jpeg'),
  })
  const imagesPathsJpg = await glob({
    pattern: path.join(process.cwd(), 'public/images', '**', '*.jpg'),
  })

  const imagesPaths = [...imagesPathsPngs, ...imagesPathsJpeg, ...imagesPathsJpg]

  await Promise.all(
    imagesPaths.map(async (imagePath) => {
      await createBlurredPlaceholder({ imagePath })
    }),
  )
}

const createBlurredPlaceholder = async ({ imagePath }) => {
  const cleanimagePath = imagePath.split('public').pop()
  const imagepathSplit = cleanimagePath.split('.')
  imagepathSplit.pop()
  const blurredImagePath = `${imagePath}.base64`

  if (!doesFolderOrFileExist(blurredImagePath)) {
    const { base64 } = await getPlaiceholder(cleanimagePath)

    await createFile({
      filePath: blurredImagePath,
      fileContent: base64,
      nojs: true,
      noTimestamp: true,
    })
  }
}
