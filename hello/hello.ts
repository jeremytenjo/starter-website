import assert from '@useweb/assert'

export type HelloProps = { name: string }

export default async function hello(props: HelloProps) {
  assert<HelloProps>({ props, requiredProps: [] })

  const data = 'hi'

  return { data }
}

export type HelloReturn = ReturnType<typeof hello>
