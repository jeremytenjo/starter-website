import createFile from '../../../../../../../../../../devtools/utils/node/createFile.js'

export type OverrideSliceIndexProps = { indexSlicePath: string; sliceName: string }

export default async function overrideSliceIndex(props: OverrideSliceIndexProps) {
  const fileContent = `import React from 'react'

  import ${props.sliceName}Prismic from '../../src/lib/components/PrismicSlices/${props.sliceName}/${props.sliceName}'
  
  const ${props.sliceName} = ({ slice }) => <${props.sliceName}Prismic {...slice} />
  
  export default ${props.sliceName}`

  await createFile({
    fileContent,
    filePath: props.indexSlicePath,
    overwrite: true,
  })
}
