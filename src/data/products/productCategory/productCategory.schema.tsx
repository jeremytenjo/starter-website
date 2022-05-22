interface ProductCategoriesSchema {
  id: string
  uid?: any
  url?: any
  type: string
  href: string
  tags: any[]
  first_publication_date: string
  last_publication_date: string
  slugs: string[]
  linked_documents: any[]
  lang: string
  alternate_languages: any[]
  data: Data
}

interface Data {
  name: string
  backgroundImage: BackgroundImage
  order?: any
}

interface BackgroundImage {
  dimensions: Dimensions
  alt?: any
  copyright?: any
  url: string
  blurDataURL?: string
}

interface Dimensions {
  width: number
  height: number
}

export default ProductCategoriesSchema
