export type FirebaseFunctionExampleProps = {
  name: string
}

export default async function firebaseFunctionExample(
  props: FirebaseFunctionExampleProps,
) {
  return {
    hello: `${props.name}'s world`,
  }
}
