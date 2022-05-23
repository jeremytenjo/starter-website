import React from 'react'

import useHomePageProps from '../../useHomePageProps/useHomePageProps'

import PopularProductsUi from './PopularProductsUi/PopularProducts.ui'

export default function PopularProducts() {
  const hp = useHomePageProps()
  const popularProducts = hp.popularProducts

  return <PopularProductsUi popularProducts={popularProducts} />
}
