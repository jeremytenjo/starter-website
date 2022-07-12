const webpackFinal = require('./storybookWebpack/webpackFinal.js')

module.exports = {
  stories: [
    '../../src/**/*.stories.@(|ts|tsx|mdx)',
    '../../slices/**/*.stories.@(|ts|tsx)',
  ],
  staticDirs: ['../../public'],
  features: { emotionAlias: false, storyStoreV7: true },
  framework: '@storybook/react',
  core: { builder: '@storybook/builder-vite' },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (defaultWebpackConfig) => {
    return webpackFinal({ defaultWebpackConfig })
  },
  refs: {
    useweb: {
      title: 'useweb library',
      url: 'https://useweb.dev/',
      expanded: false,
    },
  },
}
