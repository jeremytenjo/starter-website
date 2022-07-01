// Update the Link Resolver to match your project's route structure
export default function linkResolver(doc) {
  // doc type is equivalent to prismic doc type
  switch (doc.type) {
    case 'product':
      return `/products/${doc.slug}`
    case 'product-category':
      return `/categories/${doc.slub}`
    default:
      return '/'
  }
}
