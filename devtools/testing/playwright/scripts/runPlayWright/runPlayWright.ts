import path from 'path'
// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'

import watchFolder from '../../../../utils/node/watchFolder.js'
import shell from '../../../../utils/node/shell.js'
import getCommandLineArgs from '../../../../utils/node/getCommandLineArgs.js'
import glob from '../../../../utils/node/glob.js'

const { Select } = enquirer as any

export default async function runPlayWright() {
  const { watch, singleTest } = getCommandLineArgs([
    {
      name: 'watch',
      type: Boolean,
    },
    {
      name: 'singleTest',
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
    singTestCommand = `${selectedTest} --headed`
  }

  await runPlaywrightTests({
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
}

const runPlaywrightTests = async (props: RunPlaywrightTestsProps) => {
  const options = `${props.headed ? '--headed' : ''}`

  shell(
    `npx playwright test ${props.singTestCommand} ${options} --config=devtools/testing/playwright/playwright.config.ts`,
  )
}
