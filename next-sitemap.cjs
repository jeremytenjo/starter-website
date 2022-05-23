const appConfig = require('./app.config.cjs')

module.exports = {
  siteUrl: appConfig.siteInfo.domain,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
