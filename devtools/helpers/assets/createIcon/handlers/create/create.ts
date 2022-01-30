import createFile from '../../../../../utils/node/createFile.js'

type Props = {
  name: string
  svgString: string
  outputPath: string
}

export default async function create({ name, svgString, outputPath }: Props) {
  const svg = `import React from 'react'
import { createSvgIcon } from '@mui/material'

export default createSvgIcon(
  ${svgString},
  '${name}',
)`

  await createFile({
    filePath: outputPath,
    fileContent: svg,
    noTimestamp: true,
  })
}
