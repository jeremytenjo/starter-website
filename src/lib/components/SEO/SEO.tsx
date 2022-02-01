import React from 'react'
import Head from 'next/head'

export default function SEO({ title }) {
  return (
    <Head key={title}>
      <title>{title}</title>
    </Head>
  )
}
