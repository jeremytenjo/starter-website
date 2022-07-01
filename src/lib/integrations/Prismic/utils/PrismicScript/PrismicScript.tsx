import React from 'react'
import Script from 'next/script'

export default function PrismicScript({ id, src }) {
  return src ? <Script id={id} strategy='afterInteractive' src={src} /> : null
}
