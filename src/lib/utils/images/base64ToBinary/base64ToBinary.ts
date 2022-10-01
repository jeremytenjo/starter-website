export type Base64ToBinaryProps = { base64: string }
/**
 * @example   const binaryImage = await base64ToBinary({
    base64: `data:image;base64,${props.base64}`,
  })
 */
export default async function base64ToBinary(props: Base64ToBinaryProps) {
  const binary = await fetch(props.base64).then((res) => res.blob())

  return binary
}
