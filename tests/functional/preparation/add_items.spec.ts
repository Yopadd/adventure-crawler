import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('add item', async ({ client, expect }) => {
  const name = 'Jean'
  const password = '1234'
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  await client.post('/inscription').json({ name, password })

  let response = await client.get('/preparation/items').qs({
    limit: 5,
    page: 1,
  })
  expect(response.status()).toBe(200)
  const items = response.body().items.map((item: any) => item.name)

  response = await client.get(`/preparation/backpack`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().items.length).toBe(0)

  response = await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: items })
  expect(response.status()).toBe(200)

  // Test idempotence
  response = await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: items })
  expect(response.status()).toBe(200)

  response = await client.get(`/preparation/backpack`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().items.length).toBeGreaterThan(0)
}).setup(() => testUtils.db().truncate())
