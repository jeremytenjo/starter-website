export type AssertProps = { condition: any; name: string }

export default function assert(props: AssertProps) {
  if (!Boolean(props.condition)) {
    const message = `${props.name} is undefined`
    throw new Error(message)
  }
}

export type AssertReturn = ReturnType<typeof assert>
