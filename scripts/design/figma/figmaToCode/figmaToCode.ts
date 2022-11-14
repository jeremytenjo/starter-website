import dotenv from 'dotenv'
import generateCodeFromFigma from '@useweb/figma-to-code'

import prettierConfig from '../../../../devtools/prettier/prettier.config.json' assert { type: 'json' }

dotenv.config({ path: '.env.local' })

export default async function figmaToCode() {
  const personalAccessToken: string = process.env.FIGMA_API_PERSONAL_ACCESS_TOKEN as any

  await generateCodeFromFigma({
    personalAccessToken,
    // https://www.figma.com/file/RtKeMMXoXeIytVrKIFhD5z/Figma-To-Code?node-id=102%3A103 Home Page
    figmaFileId: 'RtKeMMXoXeIytVrKIFhD5z',
    pageName: 'Page 1',
    outputDir: 'generatedComponents',
    iconsDir: 'generatedComponents/icons',
    storyTitle: 'design/FigmaToCode',
    prettierConfig,
  })
}
