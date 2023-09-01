import { test } from '@japa/runner'
import { uninstall } from 'App/Core/application'

test('Explore dungeon with no item in backpack player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'test'
  const password = '1234'
  await client.post('/players').json({ name, password })

  const dungeonsResp = await client.get('/dungeons').qs({ limit: 100, page: 1 })
  const dungeons = dungeonsResp.body()
  const result = await client.post(`/dungeons/${dungeons[0]}`).basicAuth(name, password)

  expect(result.status()).toBe(200)
  expect(result.body().score).toBe(0)
}).teardown(async () => {
  await uninstall()
})
