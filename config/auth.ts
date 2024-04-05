import { defineConfig } from '@adonisjs/auth'
import { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { basicAuthUserProvider, basicAuthGuard } from '@adonisjs/auth/basic_auth'

const authConfig = defineConfig({
  default: 'basic',
  guards: {
    basic: basicAuthGuard({
      provider: basicAuthUserProvider({
        model: () => import('#models/player.model'),
      }),
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
