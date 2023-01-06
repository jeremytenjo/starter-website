import withBundleAnalyzer from '@next/bundle-analyzer'

import appConfig from './app.config.js'

const withBundleAnalyzerFn = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default async () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = withBundleAnalyzerFn({
    transpilePackages: ['@useweb'],
    env: {
      nextjsPort: String(appConfig.nextjs.port),
    },
    images: {
      domains: ['images.prismic.io'],
    },
    experimental: { appDir: true },
  })

  return nextConfig
}
