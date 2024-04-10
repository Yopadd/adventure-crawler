import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('Explore dungeon with no item in backpack player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const dungeonsResp = await client.get('/preparation/dungeons').qs({ limit: 1, page: 1 })
  const dungeons = dungeonsResp.body()
  const response = await client
    .post(`/exploration/dungeons/${dungeons.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: 0,
  })
}).setup(() => testUtils.db().truncate())

test('Explore dungeon with a good item in backpack and increase score', async ({
  client,
  expect,
}) => {
  await client.post('/install')
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const itemsResp = await client.post('/preparation/items')
  const items = itemsResp.body()
  await client
    .post(`/preparation/player/backpack`)
    .basicAuth(name, password)
    .json({ itemNames: [items.at(0).name] })

  const dungeonsResp = await client.get('/preparation/dungeons').qs({ limit: 1, page: 1 })
  const dungeons = dungeonsResp.body()
  const response = await client
    .post(`/exploration/dungeons/${dungeons.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: 10,
  })
}).setup(() => testUtils.db().truncate())
