import assert from '@useweb/assert'

import gaError from '../../../integrations/Google/Firebase/analytics/events/gaError/gaError'

const isProd = process.env.NODE_ENV === 'production'

export type LogErrorProps = {
  error: Error | string
  fnName: string
  fatal?: boolean
  supressError?: boolean
}

export default async function logError(props: LogErrorProps) {
  assert({ props })
  const errorMessage =
    props.error instanceof Error ? String(props.error) : String(props.error)

  if (!props.supressError) {
    console.log('')
    console.error(props.fnName)
    console.error(errorMessage)
  }

  if (isProd) {
    gaError({
      fnName: props.fnName,
      description: errorMessage,
      fatal: props.fatal,
    })
  }
}

export type LogErrorReturn = ReturnType<typeof logError>
