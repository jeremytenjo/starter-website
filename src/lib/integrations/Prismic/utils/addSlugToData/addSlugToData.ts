export type AddSlugToDataProps = { data: any[]; slugKey: string }

export default function addSlugToData({
  data = [],
  slugKey = 'title',
}: AddSlugToDataProps) {
  const dataWithSlug = data.map((d) => {
    const slugSplit = d.data[slugKey].split(' ')
    const slugMap = slugSplit.map((text) => text.toLocaleLowerCase())
    const slug = slugMap.join('-')

    const newData = {
      slug,
      ...d,
    }

    return newData
  })

  return dataWithSlug
}
