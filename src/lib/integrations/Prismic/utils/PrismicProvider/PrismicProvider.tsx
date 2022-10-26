import React from 'react'
import { PrismicProvider as PrismicProviderLib } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import Link from '@useweb/ui/Link'

import linkResolver from '../linkResolver/linkResolver'

export default function PrismicProvider({ children, repositoryName, disablePreview }) {
  return (
    <PrismicProviderLib
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      {!disablePreview && (
        <PrismicPreview repositoryName={repositoryName}>{children}</PrismicPreview>
      )}

      {disablePreview && children}
    </PrismicProviderLib>
  )
}
