import { Layer } from 'effect'
import { Logger } from '../context'

export const makeLogger = (logger: Logger) => Layer.succeed(Logger, logger)

export const ConsoleLoggerLive = Layer.succeed(
  Logger,
  {
    info: (message) => console.log(`[INFO] ${message}`),
    success: (message) => console.log(`[SUCCESS] ${message}`),
    warn: (message) => console.warn(`[WARN] ${message}`),
    error: (message) => console.error(`[ERROR] ${message}`),
    log: (message) => console.log(message),
  }
)
