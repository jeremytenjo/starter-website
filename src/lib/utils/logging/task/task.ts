type TaskProps = {
  fn: (props?: any) => Promise<any>
  title: string
  onError?: (error: any) => any
  noBail?: boolean
}

export default async function task(props: TaskProps) {
  console.log(`IN PROGRESS: ${props.title}`)
  console.log('')

  try {
    const result = await props.fn()

    if (result.error || result.errno) {
      throw new Error(`Code: ${result.error?.code} - Message: ${result.error?.message}`)
    }

    console.log('')
    log.success(props.title)

    return result
  } catch (error: any) {
    if (props?.onError) {
      await props.onError(error)
      return
    }

    const errorMessage = error.toString() || ''

    console.log('')
    console.log(`ERROR: ${props.title}`)
    console.error(errorMessage)
    console.trace()

    if (props.noBail) return

    throw new Error(errorMessage)
  } finally {
    console.log('')
  }
}

const log = {
  success: (text) => {
    console.log(`SUCCESS: ${text}`)
  },
}
