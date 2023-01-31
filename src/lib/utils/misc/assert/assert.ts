export type AssertProps = { condition?: any; props?: any; ignoreProps?: string[] }

export default function assert(props: AssertProps) {
  const missingProps: string[] = []
  const { ignoreProps = [] } = props

  if (props.props) {
    for (const [key, value] of Object.entries(props.props)) {
      if (value === undefined && !ignoreProps.includes(key)) {
        missingProps.push(key)
      }
    }

    if (missingProps.length) {
      throw new Error(`Missing props: ${missingProps.join(',')}`)
    }
  } else if (!Boolean(props.condition)) {
    throw new Error(`condition failed`)
  }
}

export type AssertReturn = ReturnType<typeof assert>
