/* eslint-disable @typescript-eslint/ban-ts-comment */
export type NextApiProps = { name: string; payload?: object; port?: number }

// can't be in node_modules because it would not have access to procce.env or import.meta
export default async function nextApi(props: NextApiProps) {
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

  const data = await fetch(
    `${prefix}api/${props.name}`,
    props.payload && {
      method: 'post',
      body: JSON.stringify(props.payload),
    },
  ).then((res) => res.json())

  return data
}
