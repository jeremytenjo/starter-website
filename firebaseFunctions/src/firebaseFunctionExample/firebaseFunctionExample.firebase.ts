import type { Request } from 'firebase-functions/v2/https'
import firebaseFunctionExample, {
  type FirebaseFunctionExampleProps as Props,
} from './firebaseFunctionExample.js'

export type FirebaseFunctionExampleProps = {
  req: Request
  payload: Props
}

export default async function firebase_firebaseFunctionExample({
  payload,
}: FirebaseFunctionExampleProps) {
  const res = await firebaseFunctionExample(payload)

  return res
}
