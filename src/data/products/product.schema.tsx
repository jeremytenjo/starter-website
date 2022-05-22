interface ProductSchema {
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
  category: Category
  affiliateLinkCA: string
  affiliateLinkUS: string
  Description: string
  image: Image
  tikTokLink: string | null
  TikTokEmbedLink: string | null
}

interface Image {
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

interface Category {
  id: string
  type: string
  tags: any[]
  lang: string
  slug: string
  first_publication_date: string
  last_publication_date: string
  link_type: string
  isBroken: boolean
}

export default ProductSchema
