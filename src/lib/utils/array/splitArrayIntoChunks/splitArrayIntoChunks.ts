export type SplitArrayIntoChunksProps = { array: any[]; chunkSize: number }

export default function splitArrayIntoChunks(props: SplitArrayIntoChunksProps) {
  const R = props.array.reduce((acc, _, i) => {
    if (i % props.chunkSize === 0) acc.push(props.array.slice(i, i + props.chunkSize))
    return acc
  }, [])
  return R
}
