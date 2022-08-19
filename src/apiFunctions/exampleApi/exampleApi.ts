export type ExampleApiProps = {
  name?: string
}

export default async function exampleApi(props: ExampleApiProps) {
  try {
    const data = `hello ${props.name} from the example api :)`

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
