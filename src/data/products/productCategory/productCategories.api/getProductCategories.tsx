import getImagePlaceholder from '../../../../lib/utils/images/getImagePlaceholder/getImagePlaceholder'
import productCategoryStubs from '../productCategory.stubs'
import type ProductCategorySchema from '../productCategory.schema'
import getData from '../../../../lib/utils/data/getData/getData'
import getProductCategoriesFromPrismic from '../../products.prismic/getProductCategories.prismic'

export default async function getProductCategories({ previewData = {} } = {}) {
  const getFn = () => getProductsCategoryFromApi({ previewData })

  const productCategories: ProductCategorySchema[] = await getData({
    stubs: productCategoryStubs,
    getFn,
  })

  return productCategories
}

const getProductsCategoryFromApi = async ({ previewData = {} } = {}) => {
  const productCategories: ProductCategorySchema[] =
    await getProductCategoriesFromPrismic({
      previewData,
    })

  const productWithBlurDataURL = await Promise.all(
    productCategories.map(async (productCategory) => {
      if (!productCategory.data.backgroundImage.url) {
        return productCategory
      }

      const { base64 } = await getImagePlaceholder({
        imageUrl: productCategory.data.backgroundImage.url,
      })

      productCategory.data.backgroundImage.blurDataURL = base64

      return productCategory
    }),
  )

  return productWithBlurDataURL
}
