import * as prismic from '@prismicio/client'

// TODO add prismicProjectName
const prismicProjectName = undefined
const apiEndpoint = `https://${prismicProjectName}.prismic.io/api/v2`
const repositoryName = prismic.getRepositoryName(apiEndpoint)
// TODO add accessToken
const accessToken = undefined
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
