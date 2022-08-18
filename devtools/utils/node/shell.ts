// https://github.com/open-cli-tools/concurrently
import concurrently, { type ConcurrentlyCommandInput } from 'concurrently'

type ShellProps = string | string[] | ConcurrentlyCommandInput[]

/**
 * @example
// run single command 
 * shell('npm run start')
 * 
// run concurrently
 * shell(['npm run start:app', 'npm run start:storybook'])
 */
export default async function shell(commands: ShellProps) {
  const _commands = typeof commands === 'string' ? [commands] : commands

  const { result } = await concurrently(_commands, {
    prefix: 'none',
  })

  await result

  return result
}
