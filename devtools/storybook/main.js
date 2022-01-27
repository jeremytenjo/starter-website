module.exports = {
  // https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project
  stories: ['../../src/**/sb.stories.tsx'],
  staticDirs: ['../../public'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
  ],
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
  },
  core: {
    // https://github.com/eirslett/storybook-builder-vite
    builder: 'storybook-builder-vite',
  },
}
