import React from 'react'
import { PrismicProvider as PrismicProviderLib } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'

import Link from '../../../../components/basic/misc/Link/Link'
import linkResolver from '../linkResolver/linkResolver'

export default function PrismicProvider({ children, repositoryName }) {
  return (
    <PrismicProviderLib
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>{children}</PrismicPreview>
    </PrismicProviderLib>
  )
}
