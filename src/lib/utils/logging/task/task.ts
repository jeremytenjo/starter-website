type TaskProps<ResultProps = any> = {
  fn: (props?: any) => Promise<ResultProps>
  title: string
  noBail?: boolean
  onError?: (props: { error: any }) => any
  onLoading?: (props: { loading: boolean }) => any
}

export default async function task<ResultProps = any>(
  props: TaskProps<ResultProps>,
): Promise<ResultProps> {
  props.onLoading && props.onLoading({ loading: true })
  console.log(`IN PROGRESS: ${props.title}`)
  console.log('')

  try {
    const result = await props.fn()

    // handle error return
    const potentialVars: any = result
    if (potentialVars?.error || potentialVars?.errno) {
      throw new Error(
        `Code: ${potentialVars.error?.code} - Message: ${potentialVars.error?.message}`,
      )
    }

    console.log('')
    log.success(props.title)

    return result
  } catch (error: any) {
    if (props?.onError) {
      await props.onError(error)
      return undefined as any
    }

    const errorMessage = error.toString() || ''

    console.log('')
    console.log(`ERROR: ${props.title}`)
    console.error(errorMessage)
    console.trace()

    if (props.noBail) return undefined as any

    throw new Error(errorMessage)
  } finally {
    props.onLoading && props.onLoading({ loading: false })
    console.log('')
  }
}

const log = {
  success: (text: string) => {
    console.log(`SUCCESS: ${text}`)
  },
}
