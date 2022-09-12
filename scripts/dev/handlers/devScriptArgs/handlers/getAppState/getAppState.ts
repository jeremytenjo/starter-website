// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'

import getCommandLineArgs from '../../../../../../devtools/utils/node/getCommandLineArgs.js'

type GetAppStateReturn = {
  isUserSignedIn: boolean
}

export default async function getAppState(): Promise<GetAppStateReturn> {
  const scriptArgs = getCommandLineArgs([
    { name: 'withMockData', type: Boolean },
    { name: 'isUserSignedIn', type: Boolean },
  ])

  // https://github.com/enquirer/enquirer#-built-in-prompts
  const prompts = [
    {
      type: 'confirm',
      name: 'isUserSignedIn',
      message: 'Is user signed in?',
      skip: scriptArgs.isUserSignedIn,
    },
    // add more as needed here...
  ]

  const data: GetAppStateReturn = await enquirer.prompt(prompts)

  return data
}
