import { throttle } from '#start/limiter'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GlobalRateLimiteMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    return throttle(ctx, next)
  }
}
