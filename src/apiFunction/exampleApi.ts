/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest } from 'next'

type ExampleApiProps = {
  name: string
}

export default async function exampleApi({
  req = {} as NextApiRequest,
  body = {} as ExampleApiProps,
}) {
  try {
    const data = `hello ${body.name} from the example api :)`

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
