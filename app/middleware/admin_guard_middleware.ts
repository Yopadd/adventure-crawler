import env from '#start/env'
import { errors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminGuardMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (ctx.request.header('Authorization') !== `Bearer ${env.get('APP_KEY')}`) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: 'basic' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
