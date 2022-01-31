import createFile from '../../../../utils/node/createFile.js'
import removeSVGProps from '../../../../utils/svg/removeSVGProps.js'

type Props = {
  name: string
  svgString: string
  outputPath: string
}

export default async function create({ name, svgString, outputPath }: Props) {
  const svgStringWithoutWidthHeight = await removeSVGProps({
    string: svgString,
    propsToRemove: ['width', 'height'],
  })
  const svg = `import React from 'react'
import { createSvgIcon } from '@mui/material'

export default createSvgIcon(
  ${svgStringWithoutWidthHeight},
  '${name}',
)`

  await createFile({
    filePath: outputPath,
    fileContent: svg,
    noTimestamp: true,
  })
}
