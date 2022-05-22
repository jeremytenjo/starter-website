type LoadScriptProps = { url: string; id: string; reload?: boolean }

export default async function loadScript({ url, id, reload }: LoadScriptProps) {
  return new Promise((resolve, reject) => {
    const scriptEl = document.getElementById(id)

    if (scriptEl) {
      if (!reload) {
        // dont re add script to head
        return resolve(true)
      } else {
        // remove script from head and re add it bellow
        scriptEl.remove()
      }
    }

    const script = document.createElement('script')
    script.async = true
    script.src = url
    script.setAttribute('id', id)

    script.onload = (loadEv) => {
      return resolve(loadEv)
    }

    script.onerror = (error) => {
      return reject(error)
    }

    document.head.appendChild(script)
  })
}
