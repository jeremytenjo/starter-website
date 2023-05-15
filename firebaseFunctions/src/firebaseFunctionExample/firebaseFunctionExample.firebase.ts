import firebaseFunctionExample, {
  type FirebaseFunctionExampleProps as Props,
} from './firebaseFunctionExample.js'

export type FirebaseFunctionExampleProps = {
  payload: Props
}

export default async function firebase_firebaseFunctionExample({
  payload,
}: FirebaseFunctionExampleProps) {
  const res = await firebaseFunctionExample(payload)

  return res
}
