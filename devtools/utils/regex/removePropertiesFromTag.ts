import SVGO from 'svgo'

type Props = {
  string: string
  propsToRemove: string[]
}

export default async function removePropertiesFromTag({
  string,
  propsToRemove = [],
}: Props) {
  const propsToRemoveObject = {}

  propsToRemove.forEach((prop) => {
    propsToRemoveObject[prop] = false
  })

  const { data: editedSVG } = await SVGO.optimize(string, {
    path: '',
    plugins: [
      {
        // https://github.com/svg/svgo/blob/master/plugins/removeDimensions.js
        name: 'removeDimensions',
        attributes: propsToRemoveObject,
      },
    ],
  })

  return editedSVG
}
