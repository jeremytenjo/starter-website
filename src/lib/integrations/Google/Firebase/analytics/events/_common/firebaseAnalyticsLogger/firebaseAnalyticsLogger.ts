import assert from '@useweb/assert'
import { getAnalytics, logEvent } from 'firebase/analytics'

export type FirebaseAnalyticsLoggerProps = { eventName: string; params: any }

export default async function firebaseAnalyticsLogger(
  props: FirebaseAnalyticsLoggerProps,
) {
  assert({ props })
  const analytics = getAnalytics()

  logEvent(analytics, props.eventName, {
    debug_mode: process.env.NODE_ENV !== 'production',
    ...props.params,
  })
}

export type FirebaseAnalyticsLoggerReturn = ReturnType<typeof firebaseAnalyticsLogger>
