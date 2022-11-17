import dotenv from 'dotenv'
import generateCodeFromFigma from '@useweb/figma-to-code'

import prettierConfig from '../../../../devtools/prettier/prettier.config.json' assert { type: 'json' }

dotenv.config({ path: '.env.local' })

export default async function figmaToCode() {
  const personalAccessToken: string = process.env.FIGMA_API_PERSONAL_ACCESS_TOKEN as any

  await generateCodeFromFigma({
    personalAccessToken,
    // https://www.figma.com/file/c7FWk1Nfl01MRIOhhT3aFi/starter-website?node-id=1%3A2
    figmaFileId: 'c7FWk1Nfl01MRIOhhT3aFi',
    figmaPageName: 'Designs',
    outputPagesDir: 'src/pagesContent',
    outputComponentsDir: 'src/lib/components',
    outputIconsDir: 'src/lib/components/icons',
    storyTitlePrefix: 'FigmaToCode',
    overwrite: true,
    prettierConfig,
  })
}
