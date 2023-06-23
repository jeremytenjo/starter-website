const webpackFinal = require('./storybookWebpack/webpackFinal.js')
const stories = require('./storiesList.cjs')

module.exports = {
  stories: [
    ...stories,
    '../../src/lib/integrations/Prismic/slices/**/*.stories.@(|ts|tsx)',
    '../../firebaseFunctions/**/*.stories.@(|ts|tsx)',
  ],
  staticDirs: ['../../public'],
  framework: '@storybook/nextjs',
  core: { builder: 'webpack5', disableTelemetry: true },
  addons: [
    {
      // https://storybook.js.org/docs/react/essentials/introduction#disabling-addons
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  features: {
    interactionsDebugger: true, // 👈 Enable playback controls
  },
  webpackFinal: async (defaultWebpackConfig) => {
    return webpackFinal({ defaultWebpackConfig })
  },
}
