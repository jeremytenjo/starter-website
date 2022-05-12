import shell from '../../../utils/node/shell.js'

export default function debugLadle() {
  shell(`DEBUG=ladle* pnpm ladle serve --config ./devtools/ladle`)
}
