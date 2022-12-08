import dotenv from 'dotenv'
import { type FigmaToCodeConfigProps } from '@useweb/figma-to-code/build/types/generateCodeFromFigma/handlers/getFigmaToCodeConfig/getFigmaToCodeConfig'

import prettierConfig from '../prettier/prettier.config.json' assert { type: 'json' }

dotenv.config({ path: '.env.local' })

export default async function figmaToCodeConfig() {
  const personalAccessToken = process.env.FIGMA_API_PERSONAL_ACCESS_TOKEN as string

  const figmaToCodeConfig: FigmaToCodeConfigProps = {
    personalAccessToken,
    figmaFileId: 'c7FWk1Nfl01MRIOhhT3aFi',
    figmaPageName: 'High Fidelity',
    outputPagesDir: 'src/pagesContent',
    outputComponentsDir: 'src/lib/components',
    outputIconsDir: 'src/lib/components/icons',
    overwrite: false,
    prettierConfig,
    // filterRootFigmaNodes(props) {
    //   return props.figmaNode.name === ''
    // },
  }

  return figmaToCodeConfig
}
