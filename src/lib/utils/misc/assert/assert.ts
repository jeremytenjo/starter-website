export type AssertProps = { condition: boolean; name: string }

export default function assert(props: AssertProps) {
  if (!props.condition) {
    const message = `${props.name} is undefined`
    throw new Error(message)
  }
}

export type AssertReturn = ReturnType<typeof assert>
