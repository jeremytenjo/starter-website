import nodeWatch from 'node-watch'

type WatchFolderProps = {
  folderToWatch: string
  onChange: (event: string, itemPath: string) => any
}

/**
 * [Docs](https://github.com/yuanchuan/node-watch)
 * 
 * @example
 *  const folderToWatch = path.join(process.cwd(), 'src')
    watchFolder({
      folderToWatch,
      onChange: runPlaywrightTests,
    })
 */
export default function watchFolder({ folderToWatch, onChange }: WatchFolderProps) {
  nodeWatch(folderToWatch, { recursive: true }, onChange)
}
