export function buildReasonMessageErrors(message: string, ...errors: Error[]) {
  return `${message}, reason : ${errors.map((err) => `\n\t- ${err.message}`).join('\n')}`
}

export abstract class ErrorReason extends Error {
  protected constructor(message: string, ...errors: Error[]) {
    if (errors.length > 0) {
      super(buildReasonMessageErrors(message, ...errors))
    } else {
      super(message)
    }
  }
}
