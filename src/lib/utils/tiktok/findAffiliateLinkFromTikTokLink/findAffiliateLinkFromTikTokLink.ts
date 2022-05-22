import type ProductSchema from '../../../../data/products/product.schema'

type FindLinkFromTikTokLinkProps = { data: ProductSchema[]; tikTokLink: string }

export default function findLinkFromTikTokLink({
  data,
  tikTokLink,
}: FindLinkFromTikTokLinkProps) {
  let affiliateLink: boolean | string = false

  const [matchedItem] = data.filter((d) => {
    return d.data.tikTokLink?.toLocaleLowerCase().includes(tikTokLink.toLocaleLowerCase())
  })

  if (matchedItem) {
    affiliateLink = matchedItem.data.affiliateLinkCA
  }

  return affiliateLink
}
