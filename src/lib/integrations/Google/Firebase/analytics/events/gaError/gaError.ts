import assert from '@useweb/assert'
import firebaseAnalyticsLogger from '../_common/firebaseAnalyticsLogger/firebaseAnalyticsLogger'

export type GaErrorProps = { description: string; fatal?: boolean; fnName: string }

export default async function gaError(props: GaErrorProps) {
  assert({ props })

  firebaseAnalyticsLogger({
    eventName: 'exception',
    params: {
      description: props.description,
      fatal: Boolean(props.fatal),
      functionName: props.fnName,
    },
  })
}

export type GaErrorReturn = ReturnType<typeof gaError>
