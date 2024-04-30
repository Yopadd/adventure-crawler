import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('Explore adventure with no item in backpack player', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const adventuresResp = await client.get('/preparation/adventures').qs({ limit: 1, page: 1 })
  const adventures = adventuresResp.body()
  const response = await client
    .post(`/exploration/adventures/${adventures.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: 1,
    report: expect.any(String),
  })
}).setup(() => testUtils.db().truncate())

test('Explore adventure with a goods items in backpack and increase score', async ({
  client,
  expect,
}) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const itemsResp = await client.get('/preparation/items').qs({
    limit: 2,
    page: 1,
  })
  const items = itemsResp.body()

  // Put Sword in backpack
  await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: [items.at(0).name] })

  const adventuresResp = await client.get('/preparation/adventures').qs({ limit: 1, page: 1 })
  const adventures = adventuresResp.body()

  // Explore first adventure
  let response = await client
    .post(`/exploration/adventures/${adventures.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: 4,
    report: expect.any(String),
  })
}).setup(() => testUtils.db().truncate())

test("explore adventure that interact with player's backpack", async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const itemsResp = await client.get('/preparation/items').qs({
    limit: 5,
    page: 1,
  })
  const items = itemsResp.body()

  // Put Water Bottle in backpack
  await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: [items.at(1).name] })

  // Explore adventure
  const adventuresResp = await client.get('/preparation/adventures').qs({ limit: 2, page: 1 })
  const adventures = adventuresResp.body()
  await client.post(`/exploration/adventures/${adventures.at(0).name}`).basicAuth(name, password)

  const response = await client
    .get('/preparation/backpack')
    .qs({ limit: 100, page: 1 })
    .basicAuth(name, password)
  expect(response.body()).toEqual({
    items: [],
  })
}).setup(() => testUtils.db().truncate())
