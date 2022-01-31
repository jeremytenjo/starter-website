import clipboard from 'clipboardy'

import log, { chalk } from './log.js'

type Props = {
  text: string
}

// https://github.com/sindresorhus/clipboardy
export default function copyToClipboard({ text }: Props) {
  clipboard.writeSync(text)
  log(`${chalk.cyan(text)} copied to clipboard`)
}
