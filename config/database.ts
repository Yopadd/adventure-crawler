/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  /*
|--------------------------------------------------------------------------
| Connection
|--------------------------------------------------------------------------
|
| The primary connection for making database queries across the application
| You can use any key from the `connections` object defined in this same
| file.
|
*/
  connection: env.get('DB_CONNECTION'),

  connections: {
    /*
  |--------------------------------------------------------------------------
  | PostgreSQL config
  |--------------------------------------------------------------------------
  |
  | Configuration for PostgreSQL database. Make sure to install the driver
  | from npm when using this connection
  |
  | npm i pg
  |
  */
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
      },
      debug: false,
    },
  },
})

export default databaseConfig
