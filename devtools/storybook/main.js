const webpackFinal = require('./storybookWebpack/webpackFinal.js')

module.exports = {
  stories: ['../../src/**/*.stories.@(|ts|tsx)', '../../slices/**/*.stories.@(|ts|tsx)'],
  staticDirs: ['../../public'],
  framework: '@storybook/nextjs',
  core: { builder: 'webpack5', disableTelemetry: true },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (defaultWebpackConfig) => {
    return webpackFinal({ defaultWebpackConfig })
  },
}
