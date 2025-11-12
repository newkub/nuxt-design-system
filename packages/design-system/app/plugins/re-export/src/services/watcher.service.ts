import chokidar from 'chokidar'

export function watch(paths: string | readonly string[], callback: () => void): () => Promise<void> {
  const watcher = chokidar.watch(paths, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  })

  watcher
    .on('add', callback)
    .on('change', callback)
    .on('unlink', callback)
    .on('error', (error) => console.error('Watcher error:', error))

  return () => watcher.close()
}
