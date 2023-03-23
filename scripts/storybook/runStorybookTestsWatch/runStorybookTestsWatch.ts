import shell from '../../../devtools/utils/node/shell.js'

export default async function runStorybookTestsWatch() {
  shell([
    {
      command: `test-storybook -c ./devtools/storybook --watch`,
      name: 'run storybook tests',
    },
  ])
}
