import * as prismic from '@prismicio/client'

const prismicProjectName = process.env.NEXT_PUBLIC_PRISMIC_PROJECT_NAME || undefined
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN || undefined
const apiEndpoint = `https://${prismicProjectName}.prismic.io/api/v2`
const repositoryName = prismic.getRepositoryName(apiEndpoint)

const prismicConfig = {
  repositoryName,
  apiEndpoint,
  accessToken,
  previewUrl:
    process.env.NODE_ENV === 'production'
      ? `https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicProjectName}`
      : false,
}

export default prismicConfig
