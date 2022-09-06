import React from 'react'

import prismicConfig from '../../../services/prismic/prismic.config'

import PrismicProvider from './utils/PrismicProvider/PrismicProvider'
import PrismicScript from './utils/PrismicScript/PrismicScript'

type PrismicProps = {
  children: any
  disablePreview?: boolean
}

export default function Prismic(props: PrismicProps) {
  return prismicConfig.accessToken ? (
    <>
      <PrismicScript id='prismic-tags' src={prismicConfig.previewUrl} />

      <PrismicProvider
        repositoryName={prismicConfig.repositoryName}
        disablePreview={props.disablePreview}
      >
        {props.children}
      </PrismicProvider>
    </>
  ) : (
    props.children
  )
}
