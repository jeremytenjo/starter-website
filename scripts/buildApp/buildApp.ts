import shell from '../../devtools/utils/node/shell.js'

export default function buildApp() {
  const commands = `node --experimental-json-modules node_modules/.bin/next build`

  shell(commands)
}
