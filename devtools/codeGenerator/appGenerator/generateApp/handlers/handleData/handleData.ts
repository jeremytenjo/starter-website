import { type ContextProps } from '../../generateApp'

export type DataProps = {
  context: ContextProps
  data: {
    name: string
  }[]
}

export default function handleData({ data = [], context }: DataProps) {
  // console.log('HERE!')
}
