import appConfig from '../../../../../app.config'

export default function isProductionSite() {
  if (typeof window === 'undefined') return false

  const domainWithoutWWW = appConfig.siteInfo.domain.replace('www.', '')

  const isProdWebsite =
    window.location.href.includes(appConfig.siteInfo.domain) ||
    window.location.href.includes(domainWithoutWWW)

  return isProdWebsite
}
