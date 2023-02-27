export type GetIsUrlActiveProps = { href: string; pathname: string; exact?: boolean }

export default function getIsUrlActive(props: GetIsUrlActiveProps) {
  const isHomeHref = props.href === '/'
  const comparableHref = isHomeHref ? '/home' : props.href

  let isActive = false

  if (!isHomeHref) {
    if (props.exact) {
      isActive = props.pathname === comparableHref
    } else {
      isActive = props.pathname.includes(comparableHref)
    }
  }

  if (props.href === '/' && props.pathname === '/') {
    isActive = true
  }

  return isActive
}

export type GetIsUrlActiveReturn = ReturnType<typeof getIsUrlActive>
