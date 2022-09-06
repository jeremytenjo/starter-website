import appConfig from './app.config.js'

export default {
  siteUrl: appConfig.siteInfo.domain,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
