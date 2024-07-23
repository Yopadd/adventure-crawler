/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import env from '#start/env'
import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', (ctx) => {
  return limiter
    .allowRequests(env.get('RATE_LIMIT'))
    .every('1 minute')
    .usingKey(`ip_${ctx.request.ip()}_user_${ctx.auth.user?.name}`)
})
