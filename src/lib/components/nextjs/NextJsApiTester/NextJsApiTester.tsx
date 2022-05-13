import React from 'react'
import { type RequestProps } from '@useweb/use-fetch'

import FetchTester from '../../data/FetchTester/FetchTester'

export type NextjsApiTesterProps = { name: string; payload?: RequestProps }

export default function NextjsApiTester({ name, payload }: NextjsApiTesterProps) {
  const url = `http://localhost:3000/api/${name}`

  return <FetchTester url={url} payload={payload} />
}
