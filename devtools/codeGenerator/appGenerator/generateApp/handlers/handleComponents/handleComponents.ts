import { type ComponentProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'

export type ComponentsProps = {
  context: ContextProps
  components: {
    name: string
    localComponents?: ComponentProps[]
  }[]
}

export default function handleComponents({ components = [], context }: ComponentsProps) {
  // console.log('HERE!')
}
