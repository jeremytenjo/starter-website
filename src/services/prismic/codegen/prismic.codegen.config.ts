import type { Config } from 'prismic-ts-codegen'

const config: Config = {
  output: './src/services/prismic/codegen/prismic.codegen.types.ts',
  models: ['./customtypes/**/index.json', './slices/**/model.json'],
}

export default config
