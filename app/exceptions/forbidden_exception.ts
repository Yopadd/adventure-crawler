import { Exception } from '@adonisjs/core/exceptions'

export default class ForbiddenException extends Exception {
  static status = 403
  static message = 'Forbidden'

  constructor(message: string) {
    super(message, { status: 403 })
  }

  async report() {}
}
