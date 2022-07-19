import prettier from 'prettier'

export type PrettifyFileProps = { prettierConfig?: any; content: string }

export default function prettifyFile({
  prettierConfig = {},
  content = '',
}: PrettifyFileProps) {
  try {
    const prettifiedContent = prettier.format(content, {
      ...prettierConfig,
      parser: 'babel',
    })
    return prettifiedContent
  } catch (error) {
    return content
  }
}
