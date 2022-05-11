import shell from '../../../utils/node/shell.js'

export default function buildLadle() {
  shell('ladle build --config ./devtools/ladle')
}
