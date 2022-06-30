import googleAnalyticsConfig from '../../../../services/google/googleAnalytics/googleAnalytics.config'

declare global {
  interface Window {
    gtag: any
  }
}

/**
 * [Docs](https://developers.google.com/analytics/devguides/collection/gtagjs/pages)
 */
export function gTagPageview({ url }) {
  window.gtag('config', googleAnalyticsConfig.measurementId, {
    page_path: url,
  })
}

// https://support.google.com/analytics/answer/1033068#Anatomy&zippy=%2Cin-this-article
/**
 * [Docs](https://developers.google.com/analytics/devguides/collection/gtagjs/events)
 */
export function gtagEvent({ action, category, ...rest }) {
  window.gtag('event', action, {
    event_category: category,
    ...rest,
  })
}

export function clickedBuyButton({ storeLink }) {
  window.gtag('event', 'clicked buy button', {
    event_category: 'Buy',
    action: 'Clicked buy button',
    storeLink,
  })
}
