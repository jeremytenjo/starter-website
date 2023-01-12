export type AssertProps = { condition: boolean; name: string }

export default function assert(props: AssertProps) {
  if (!props.condition) {
    const message = `${props.name} is undefined`
    console.error(message)
    console.trace()
    throw new Error()
  }
}

export type AssertReturn = ReturnType<typeof assert>
