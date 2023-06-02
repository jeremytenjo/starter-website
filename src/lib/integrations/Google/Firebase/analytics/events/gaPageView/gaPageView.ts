import { useEffect } from 'react'
import firebaseAnalyticsLogger from '../_common/firebaseAnalyticsLogger/firebaseAnalyticsLogger'
import { useRouter } from 'next/router'

export default async function gaPageView() {
  firebaseAnalyticsLogger({
    eventName: 'page_view',
    params: {
      page_title: document.title,
      page_location: window.location.href,
    },
  })
}

export type LogPageViewReturn = ReturnType<typeof gaPageView>

export function useGaPageView() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      gaPageView()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
