import React from 'react'

import useHomePageProps from '../../useHomePageProps/useHomePageProps'

import CategoriesUi from './CategoriesUi/Categories.ui'

export default function Categories() {
  const homePageProps = useHomePageProps()
  const categories = homePageProps.productCategories

  return <CategoriesUi categories={categories} />
}
