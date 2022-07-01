import getProducts from '../products/products.api/getProducts'
import getProductCategories from '../products/productCategory/productCategories.api/getProductCategories'
import getProductCategoryUrlId from '../products/productCategory/getProductCategoryUrlId/getProductCategoryUrlId'

export default async function getRootLayoutData({ previewData }) {
  const products = await getProducts({ previewData })
  const productCategories = await getProductCategories({ previewData })

  const navLinks = productCategories.map((category) => {
    const url = `/categories/${getProductCategoryUrlId({ category })}`

    return {
      id: category.id,
      label: category.data.name,
      url,
    }
  })

  return {
    rootHeaderProps: {
      products,
      navLinks,
    },
  }
}
