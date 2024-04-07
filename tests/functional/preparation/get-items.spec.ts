import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get item list', async ({ client, expect }) => {
  await client.post('/install')

  const response = await client.get('/preparation/items').qs({
    limit: 100,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body().length).toBeGreaterThan(0)
  response.body().forEach((item: unknown) => {
    expect(item).toEqual({
      name: expect.any(String),
    })
  })
}).setup(() => testUtils.db().truncate())
