import addEmulatorData from './handlers/addEmulatorData/addEmulatorData.js'
import getAppState from './handlers/getAppState/getAppState.js'

export default async function devScriptArgs() {
  const appState = await getAppState()

  const command = await addEmulatorData({ addAuth: appState.isUserSignedIn })

  return command
}
