import addEmulatorData from './handlers/addEmulatorData/addEmulatorData.js'
import getAppState from './handlers/getAppState/getAppState.js'

export default async function devScriptArgs() {
  const appState = await getAppState()

  await addEmulatorData({ addAuth: appState.isUserSignedIn })

  process.exit(0)
}
