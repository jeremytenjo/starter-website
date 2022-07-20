import React from 'react'

import CertificatesUi, {
  type CertificatesUiProps,
} from './CertificatesUi/Certificates.ui'

export default function Certificates() {
  const uiProps: CertificatesUiProps = {
    title: 'Certificates',
  }

  return <CertificatesUi {...uiProps} />
}
