import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('add player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'Michael'
  const password = '1234'
  const response = await client.post('/inscription').json({ name, password })

  expect(response.status()).toBe(200)
}).setup(() => testUtils.db().truncate())
