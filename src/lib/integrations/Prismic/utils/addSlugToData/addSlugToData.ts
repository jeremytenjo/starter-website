export type AddSlugToDataProps = { data: any[]; slugKey: string }

export default function addSlugToData({
  data = [],
  slugKey = 'title',
}: AddSlugToDataProps) {
  const dataWithSlug = data.map((d) => {
    const slug = genSlug(d.data[slugKey])

    const newData = {
      slug,
      ...d,
    }

    return newData
  })

  return dataWithSlug
}

export const genSlug = (item) => {
  const slugSplit = item.split(' ')
  const slugMap = slugSplit.map((text) => text.toLocaleLowerCase())
  const slug = slugMap.join('-')

  return slug
}
