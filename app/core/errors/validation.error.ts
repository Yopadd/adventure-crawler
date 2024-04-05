import { ErrorReason } from './utils.js'

export default class ValidationError extends ErrorReason {
  constructor(message: string, ...errors: Error[]) {
    super(message, ...errors)
  }
}
