import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get item list', async ({ client, expect }) => {
  await client.post('/install')

  const response = await client.get('/preparation/items').qs({
    limit: 100,
    page: 1,
  })

  expect(response.status()).toBe(200)
}).setup(() => testUtils.db().truncate())
