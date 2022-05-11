import shell from '../../../utils/node/shell.js'

export default function startLadle() {
  shell('ladle serve --config ./devtools/ladle --open none')
}
