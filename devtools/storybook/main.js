const webpackFinal = require('./storybookWebpack/webpackFinal.js')
const stories = require('./storiesList.cjs')

module.exports = {
  stories: [...stories, '../../slices/**/*.stories.@(|ts|tsx)'],
  staticDirs: ['../../public'],
  features: { emotionAlias: false, storyStoreV7: true },
  framework: '@storybook/react',
  core: { builder: '@storybook/builder-vite', disableTelemetry: true },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (defaultWebpackConfig) => {
    return webpackFinal({ defaultWebpackConfig })
  },
}
