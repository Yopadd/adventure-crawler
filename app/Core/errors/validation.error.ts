import { ErrorReason } from './utils'

export default class ValidationError extends ErrorReason {
  constructor(message: string, ...errors: Error[]) {
    super(message, ...errors)
  }
}
