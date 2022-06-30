import React from 'react'

import PrismicProvider from '../../../utils/integrations/prismic/PrismicProvider/PrismicProvider'
import PrismicScript from '../../../utils/integrations/prismic/PrismicScript/PrismicScript'
import prismicConfig from '../../../../services/prismic/prismic.config'

export default function Prismic({ children }) {
  return prismicConfig.accessToken ? (
    <>
      <PrismicScript id='prismic-tags' src={prismicConfig.previewUrl} />

      {/* <PrismicProvider repositoryName={prismicConfig.repositoryName}> */}
      <PrismicProvider>{children}</PrismicProvider>
    </>
  ) : (
    children
  )
}
