import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

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
  const items: Array<{ name: string }> = itemsResp.body().items

  await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: items.map((item) => item.name) })

  const adventuresResp = await client.get('/preparation/adventures').qs({ limit: 1, page: 1 })
  const { adventures } = adventuresResp.body()

  // Explore adventure
  let response = await client
    .post(`/exploration/adventures/${adventures.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: expect.any(Number),
    report: expect.any(String),
  })
}).setup(() => testUtils.db().truncate())
