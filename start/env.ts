/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/
import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  LOG_LEVEL: Env.schema.string(),
  MAX_PLAYERS: Env.schema.number(),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_CONNECTION: Env.schema.string(),
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(['redis', 'memory'] as const),
  RATE_LIMIT: Env.schema.number(),
})
