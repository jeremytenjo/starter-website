import withBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzerFn = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzerFn({
  images: {
    domains: ['images.prismic.io'],
  },
})
