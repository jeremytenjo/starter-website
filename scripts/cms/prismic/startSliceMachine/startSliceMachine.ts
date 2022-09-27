import shell from '../../../../devtools/utils/node/shell.js'

import handleNewPrismicSlice from './handlers/handleNewPrismicSlice/handleNewPrismicSlice.js'

export default async function startSliceMachine() {
  shell('start-slicemachine')
  handleNewPrismicSlice()
}
