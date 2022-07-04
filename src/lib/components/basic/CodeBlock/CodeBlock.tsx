import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'

export type CodeBlockProps = { code: string; language?: string; theme?: any }

export default function CodeBlock({
  code,
  language = 'javascript',
  theme = dracula,
}: CodeBlockProps) {
  return <CopyBlock text={code} language={language} theme={theme} />
}
