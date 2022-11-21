import dotenv from 'dotenv'

import prettierConfig from '../prettier/prettier.config.json' assert { type: 'json' }

dotenv.config({ path: '.env.local' })

export default async function figmaToCodeConfig() {
  const personalAccessToken = process.env.FIGMA_API_PERSONAL_ACCESS_TOKEN

  return {
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
    // filterRootFigmaNodes(props) {
    //   return props.figmaNode.name === ''
    // },
  }
}
