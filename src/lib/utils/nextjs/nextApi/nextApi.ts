/* eslint-disable @typescript-eslint/ban-ts-comment */
export type NextApiProps = { name: string; payload?: object; port?: number }

export type NextApiReturn = { data: any; error?: any }

// can't be in node_modules because it would not have access to procce.env or import.meta
export default async function nextApi(props: NextApiProps): Promise<NextApiReturn> {
  if (!props.name) throw new Error('Missing name prop')

  const port =
    props.port ||
    process.env.nextjsPort ||
    // @ts-ignore
    import.meta?.env?.STORYBOOK_NEXT_PORT ||
    process.env.PUBIC_NEXT_PORT ||
    3001

  const prefix =
    // @ts-ignore
    process.env.NODE_ENV === 'development' || import.meta?.env?.DEV
      ? `http://localhost:${port}/`
      : '/'

  const url = `${prefix}api/${props.name}`
  const body = JSON.stringify(props.payload)

  const data = await fetch(
    url,
    props.payload && {
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json())

  return data
}
