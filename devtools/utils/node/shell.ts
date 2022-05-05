// https://github.com/open-cli-tools/concurrently
import concurrently from 'concurrently'

type Props = string | string[]

/**
 * @example
// run single command 
 * shell('npm run start')
 * 
// run concurrently
 * shell(['npm run start:app', 'npm run start:storybook'])
 */
export default async function shell(commands: Props) {
  const _commands = typeof commands === 'string' ? [commands] : commands

  const { result } = concurrently(_commands, {
    prefix: 'none',
  })

  await result
  return result
}
