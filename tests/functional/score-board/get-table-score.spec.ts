import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get table score', async ({ client, expect }) => {
  const name = 'Scott'
  const password = '1234'
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  await client.post('/inscription').json({ name, password })
  const response = await client.get('/score-board').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toHaveLength(0)
}).setup(() => testUtils.db().truncate())
