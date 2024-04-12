import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('add player', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Michael'
  const password = '1234'
  const response = await client.post('/inscription').json({ name, password })

  expect(response.status()).toBe(200)
}).setup(() => testUtils.db().truncate())
