import path from 'path'
// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'
import tcpPortUsed from 'tcp-port-used'

import watchFolder from '../../../../utils/node/watchFolder.js'
import shell from '../../../../utils/node/shell.js'
import getCommandLineArgs from '../../../../utils/node/getCommandLineArgs.js'
import glob from '../../../../utils/node/glob.js'
import appConfig from '../../../../../app.config.cjs'
import log from '../../../../utils/node/log.js'

const { Select } = enquirer as any

export default async function runPlayWright() {
  if (!(await tcpPortUsed.check(appConfig.nextjs.port))) {
    console.clear()
    log('Please run `npm run dev` first', {
      error: true,
    })
  }

  const { watch, singleTest, ui } = getCommandLineArgs([
    {
      name: 'watch',
      type: Boolean,
    },
    {
      name: 'singleTest',
      type: Boolean,
    },
    {
      name: 'ui',
      type: Boolean,
    },
  ])

  let singTestCommand = ''

  if (singleTest) {
    const tests = await glob({
      pattern: path.join(process.cwd(), 'src', '**', '*.e2e.ts'),
    })

    const testsNames = tests.map((t) => t.split('/').pop())
    const prompt = new Select({
      name: 'selectedTest',
      message: 'Select test',
      choices: testsNames,
      initial: testsNames[0],
    })

    console.clear()
    const selectedTest = await prompt.run()
    console.log('')
    singTestCommand = `${selectedTest} --headed --debug`
  }

  await runPlaywrightTests({
    ui,
    headed: watch,
    singTestCommand,
  })

  if (watch) {
    const folderToWatch = path.join(process.cwd(), 'src')

    watchFolder({
      folderToWatch,
      onChange: runPlaywrightTests as any,
    })
  }
}

type RunPlaywrightTestsProps = {
  headed: boolean
  singTestCommand: string
  ui: boolean
}

const runPlaywrightTests = async (props: RunPlaywrightTestsProps) => {
  const options = `${props.headed ? '--headed' : ''} ${props.ui ? '--ui' : ''}`

  shell(
    `npx playwright test ${props.singTestCommand} --reporter=line ${options} --config=devtools/testing/playwright/playwright.config.ts`,
  )
}
