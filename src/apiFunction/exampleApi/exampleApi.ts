import type { NextApiRequest } from 'next'

type ExampleApiProps = {
  req?: NextApiRequest
  body: {
    name: string
  }
}

export default async function exampleApi(props: ExampleApiProps) {
  try {
    const data = `hello ${props.body.name} from the example api :)`

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
