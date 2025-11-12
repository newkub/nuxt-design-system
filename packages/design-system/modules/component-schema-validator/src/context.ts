import { Context } from 'effect'

export interface Logger {
  readonly info: (message: string) => void
  readonly success: (message: string) => void
  readonly warn: (message: string) => void
  readonly error: (message: string) => void
  readonly log: (message: string) => void
}

export const Logger = Context.Tag<Logger>('Logger')
