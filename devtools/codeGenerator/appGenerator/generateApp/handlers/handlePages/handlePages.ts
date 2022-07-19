import { type ContainerProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'

export type PagesProps = {
  context: ContextProps
  pages: {
    name: string
    path: string
    containers?: ContainerProps[]
  }[]
}

export default function handlePages({ pages = [], context }: PagesProps) {
  console.log(pages)
}
