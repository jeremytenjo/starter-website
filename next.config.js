import withBundleAnalyzer from '@next/bundle-analyzer'

import appConfig from './app.config.cjs'

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
      domains: [
        'images.prismic.io',
        'i.pravatar.cc',
        's3-alpha-sig.figma.com',
        'localhost',
        'firebasestorage.googleapis.com',
        'lh3.googleusercontent.com',
      ],
    },
  })

  return nextConfig
}
