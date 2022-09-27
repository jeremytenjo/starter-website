import path from 'path'

import log from '../../../../../../../../devtools/utils/node/log.js'
import doesFolderOrFileExist from '../../../../../../../../devtools/utils/node/doesFolderOrFileExist.js'
import genCodeFromTemplate from '../../../../../../../../devtools/codeGenerator/appGenerator/generateAppMap/utils/genCodeFromTemplate/genCodeFromTemplate.js'
import superCodeGenSchema from '../../../../../../../../devtools/codeGenerator/superCodeGen.schema.cjs'
import shell from '../../../../../../../../devtools/utils/node/shell.js'

import overrideSliceIndex from './handlers/overrideSliceIndex/overrideSliceIndex.js'

export type CreateSliceLibComponentProps = { newSlicePath: string }

export default async function createSliceLibComponent(
  props: CreateSliceLibComponentProps,
) {
  const sliceName = props.newSlicePath.split('/').pop()
  if (!sliceName) return
  log(`Creating ${sliceName} slice lib component...`)

  const indexSlicePath = path.join(props.newSlicePath, 'index.js')
  const sliceStubsPath = path.join(
    '../../../../../../.slicemachine/assets/slices',
    sliceName,
    'mocks.json',
  )
  const libPrismicSlicesPath = path.join(
    process.cwd(),
    'src',
    'lib',
    'components',
    'PrismicSlices',
  )

  const newLibPrismicSlicePath = path.join(libPrismicSlicesPath, sliceName)

  if (!doesFolderOrFileExist(newLibPrismicSlicePath)) {
    await genCodeFromTemplate({
      name: sliceName,
      files: superCodeGenSchema.find((s) => s.type === 'Data Component')?.files || [],
      outputPath: libPrismicSlicesPath,
      slots: {
        importOverride: `import ${sliceName}Mocks from '${sliceStubsPath}'`,
        storiesDefaultArgs: `...(${sliceName}Mocks[0] as any),`,
        useDataImports: `import type { ${sliceName}SliceDefault } from '../../../../../services/prismic/codegen/prismic.codegen.types'`,
        useDataTypeImportName: `${sliceName}SliceDefault`,
      },
    })

    // override slice index to import component lib slice
    await overrideSliceIndex({
      indexSlicePath,
      sliceName,
    })

    log(`Created ${sliceName} slice`, { success: true, space: true })
    shell('npm run cms:prismic-generate-types')
  }
}
