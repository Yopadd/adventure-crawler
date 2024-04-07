import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('Explore dungeon with no item in backpack player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'test'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const dungeonsResp = await client.get('/preparation/dungeons').qs({ limit: 5, page: 1 })
  const dungeons = dungeonsResp.body()
  const response = await client
    .post(`/exploration/dungeons/${dungeons.at(0).name}`)
    .basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: 0,
  })
}).setup(() => testUtils.db().truncate())
