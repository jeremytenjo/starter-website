/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  googleCloudFunction as fierbaseFunction,
  type GoogleCloudFunctionProps as GoogleCloudFunctionPropsLib,
} from '@useweb/firebase/useFirebaseFunction'

import firebaseConfig from '../../../../../services/google/firebase/firebase.config'

export type GoogleCloudFunctionProps = {
  name: string
  prodUrl: string
  options: GoogleCloudFunctionPropsLib['options']
}

export default async function googleCloudFunction(props: GoogleCloudFunctionProps) {
  const data = await fierbaseFunction({
    name: props.name,
    defaultProdUrl: props.prodUrl,
    options: props.options || {},
    firebase: {
      firebaseConfig: {
        projectId: firebaseConfig.projectId,
      },
      // @ts-ignore
      envIsDev: process.env.NODE_ENV === 'development' || import.meta?.env?.DEV,
    },
  })

  return data
}
