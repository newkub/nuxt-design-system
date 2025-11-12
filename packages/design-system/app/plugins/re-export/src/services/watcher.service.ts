import { Effect, Stream } from 'effect'
import chokidar from 'chokidar'

export const watch = (paths: string | readonly string[]) =>
  Stream.async<never, Error, chokidar.FSWatcher>((emit) => {
    try {
      const watcher = chokidar.watch(paths, { ignored: /(^|[\/\\])\../, persistent: true })
      watcher
        .on('add', (path) => emit.single(watcher))
        .on('change', (path) => emit.single(watcher))
        .on('unlink', (path) => emit.single(watcher))
        .on('error', (error) => emit.fail(new Error('Watcher error', { cause: error })))

      return Effect.sync(() => watcher.close())
    } catch (error) {
      emit.fail(new Error('Failed to initialize watcher', { cause: error }))
    }
  })
