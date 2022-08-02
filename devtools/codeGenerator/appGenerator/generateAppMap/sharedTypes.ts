export type ComponentProps = {
  name: string
  localComponents?: ComponentProps[]
}

export type ContainerProps = {
  name: string
  containers?: ContainerProps[]
  localComponents?: ComponentProps[]
  libComponents?: ComponentProps[]
}
