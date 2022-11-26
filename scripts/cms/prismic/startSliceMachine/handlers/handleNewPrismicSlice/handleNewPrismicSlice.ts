import path from 'path'

import log from '../../../../../../devtools/utils/node/log.js'
import shell from '../../../../../../devtools/utils/node/shell.js'
import watchFolder from '../../../../../../devtools/utils/node/watchFolder.js'

import createSliceLibComponent from './handlers/createSliceLibComponent/createSliceLibComponent.js'
import getIsPrismicConfigured from './handlers/getIsPrismicConfigured/getIsPrismicConfigured.js'

export default async function handleNewPrismicSlice() {
  const { isPrismicConfigured } = await getIsPrismicConfigured()
  if (!isPrismicConfigured) return

  log('Listening for new Prismic Slices')

  const slicesFolder = path.join(process.cwd(), 'slices')

  watchFolder({
    folderToWatch: slicesFolder,
    onChange: (evt, itemPath) => {
      // on folder change
      if (!itemPath.includes('.')) {
        createSliceLibComponent({ newSlicePath: itemPath })
      } else {
        // update slice types on file changes
        shell('npm run cms:prismic-generate-types')
      }
    },
  })
}
