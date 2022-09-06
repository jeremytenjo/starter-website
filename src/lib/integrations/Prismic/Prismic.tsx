import React from 'react'

import prismicConfig from '../../../services/prismic/prismic.config'

import PrismicProvider from './utils/PrismicProvider/PrismicProvider'
import PrismicScript from './utils/PrismicScript/PrismicScript'

export default function Prismic({ children, disablePreview }) {
  return prismicConfig.accessToken ? (
    <>
      <PrismicScript id='prismic-tags' src={prismicConfig.previewUrl} />

      <PrismicProvider
        repositoryName={prismicConfig.repositoryName}
        disablePreview={disablePreview}
      >
        {children}
      </PrismicProvider>
    </>
  ) : (
    children
  )
}
