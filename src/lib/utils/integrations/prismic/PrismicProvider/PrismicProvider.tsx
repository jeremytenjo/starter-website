import React from 'react'
import Link from 'next/link'
import { PrismicProvider as PrismicProviderLib } from '@prismicio/react'
// import { PrismicPreview } from '@prismicio/next'

import linkResolver from '../linkResolver/linkResolver'

// export default function PrismicProvider({ children, repositoryName }) {
export default function PrismicProvider({ children }) {
  return (
    <PrismicProviderLib
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      {/* TODO enable preview once https://github.com/prismicio/prismic-next/issues/13 and next support pckage module with api functions */}
      {/* <PrismicPreview repositoryName={repositoryName}>{children}</PrismicPreview> */}
      {children}
    </PrismicProviderLib>
  )
}
