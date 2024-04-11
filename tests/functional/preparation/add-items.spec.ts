import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('add item', async ({ client, expect }) => {
  const name = 'Jean'
  const password = '1234'
  await client.post('/install')
  await client.post('/inscription').json({ name, password })

  let response = await client.get('/preparation/items').qs({
    limit: 5,
    page: 1,
  })
  expect(response.status()).toBe(200)
  const items = response.body().map((item: any) => item.name)

  response = await client.get(`/preparation/player/backpack`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().items.length).toBe(0)

  response = await client
    .post(`/preparation/player/backpack`)
    .basicAuth(name, password)
    .json({ itemNames: items })
  expect(response.status()).toBe(200)

  response = await client.get(`/preparation/player/backpack`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().items).toEqual(expect.arrayContaining(['Coat']))
}).setup(() => testUtils.db().truncate())
