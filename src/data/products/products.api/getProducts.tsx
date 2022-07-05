import getImagePlaceholder from '../../../lib/utils/images/getImagePlaceholder/getImagePlaceholder'
import productsStubs from '../products.stubs'
import type ProductSchema from '../product.schema'
import getData from '../../../lib/utils/data/getData/getData'
import getProductsFromPrismic from '../products.prismic/getProducts.prismic'

export default async function getProducts({ previewData = {} } = {}) {
  const getFn = () => getProductsFromApi({ previewData })

  const products: ProductSchema[] = await getData({
    stubs: productsStubs,
    getFn,
  })

  return products
}

const getProductsFromApi = async ({ previewData = {} } = {}) => {
  const products: ProductSchema[] = await getProductsFromPrismic({ previewData })

  const productWithBlurDataURL = await Promise.all(
    products.map(async (productCategory) => {
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

  return productWithBlurDataURL
}
