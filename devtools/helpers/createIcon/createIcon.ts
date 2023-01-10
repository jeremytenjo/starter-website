import path from 'path'
import * as changeCase from 'change-case'

import log from '../../utils/node/log.js'
import copyToClipboard from '../../utils/node/copyToClipboard.js'

import enquireSVGData from './handlers/enquireSVGData/enquireSVGData.js'
import create from './handlers/create/create.js'

export default async function createIcon() {
  const { iconName, svgString } = await enquireSVGData()
  const iconNameFormatted = changeCase.pascalCase(iconName)
  const outputPath = path.join(
    process.cwd(),
    'src',
    'lib',
    'components',
    'icons',
    `${iconNameFormatted}.tsx`,
  )

  const { spinner, chalk } = log(`Creating ${iconNameFormatted}`, {
    loading: true,
  })

  try {
    await create({
      name: iconNameFormatted,
      svgString,
      outputPath,
    })

    spinner.succeed(`Created ${chalk.cyan(outputPath)}`)
    copyToClipboard({ text: iconNameFormatted })
  } catch (error: any) {
    spinner.stop()
    throw new Error(error)
  }
}
