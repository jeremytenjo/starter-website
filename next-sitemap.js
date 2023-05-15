import appConfig from './app.config.cjs'

export default {
  siteUrl: appConfig.siteInfo.domain,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
