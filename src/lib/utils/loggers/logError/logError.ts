import assert from '@useweb/assert'
// import firebaseAnalyticsLogger from '../../../integrations/Google/Firebase/analytics/events/_common/firebaseAnalyticsLogger/firebaseAnalyticsLogger'

const isProd = process.env.NODE_ENV === 'production'

export type LogErrorProps = {
  error: Error | string
  fnName: string
  supressError?: boolean
}

export default async function logError(props: LogErrorProps) {
  assert({ props })
  const errorMessage =
    props.error instanceof Error ? String(props.error) : String(props.error)

  if (!props.supressError) {
    console.log('')
    console.log(props.fnName)
    console.error(errorMessage)
  }

  if (isProd) {
    // firebaseAnalyticsLogger({
    //   eventName: 'exception',
    //   params: {
    //     description: errorMessage,
    //     fatal: false,
    //   },
    // })
  }
}

export type LogErrorReturn = ReturnType<typeof logError>
