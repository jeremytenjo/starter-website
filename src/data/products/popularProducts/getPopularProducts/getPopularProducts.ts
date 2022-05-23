import ProductsStubs from '../../products.stubs'
import type ProductSchema from '../../product.schema'
import getImagePlaceholder from '../../../../lib/utils/images/getImagePlaceholder/getImagePlaceholder'
import getProductsFromPrismic from '../../products.prismic/getProducts.prismic'
import getData from '../../../../lib/utils/data/getData/getData'

export default async function getPopularProducts({ previewData }) {
  const getFn = () => getProductsCategoryFromApi({ previewData })

  const productCategories: ProductSchema[] = await getData({
    stubs: ProductsStubs,
    getFn,
  })

  return productCategories
}

const getProductsCategoryFromApi = async ({ previewData = {} } = {}) => {
  const productCategories: ProductSchema[] = await getProductsFromPrismic({
    previewData,
  })

  const productWithBlurDataURL = await Promise.all(
    productCategories.map(async (productCategory) => {
      if (!productCategory.data.image.url) {
        return productCategory
      }

      const { base64 } = await getImagePlaceholder({
        imageUrl: productCategory.data.image.url,
      })

      productCategory.data.image.blurDataURL = base64

      return productCategory
    }),
  )

  // TODO filter most popular

  return productWithBlurDataURL
}
