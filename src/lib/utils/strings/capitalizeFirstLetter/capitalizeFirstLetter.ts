export type CapitalizeFirstLetterProps = { string: string }

export default function capitalizeFirstLetter({ string }: CapitalizeFirstLetterProps) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
