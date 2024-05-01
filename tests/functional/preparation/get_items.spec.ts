import { Items } from '#app/core/install/item/items'
import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get item list', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))

  const response = await client.get('/preparation/items').qs({
    limit: 100,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body().length).toEqual(Object.keys(Items).length - 1) // All not hidden items
  response.body().forEach((item: unknown) => {
    expect(item).toEqual({
      name: expect.any(String),
      description: expect.any(String),
    })
  })
}).setup(() => testUtils.db().truncate())
