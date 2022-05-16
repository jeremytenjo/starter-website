import React from 'react'

import PrismicProvider from '../../lib/utils/prismic/PrismicProvider/PrismicProvider'
import PrismicScript from '../../lib/utils/prismic/PrismicScript/PrismicScript'

import prismicConfig from './prismic.config'

export default function Prismic({ children }) {
  return (
    <>
      <PrismicScript id='prismic-tags' src={prismicConfig.previewUrl} />

      <PrismicProvider repositoryName={prismicConfig.repositoryName}>
        {children}
      </PrismicProvider>
    </>
  )
}
