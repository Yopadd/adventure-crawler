import { uninstall } from '#app/core/game'
import { test } from '@japa/runner'

test('get 10 first dungeons', async ({ client, expect }) => {
  await client.post('/install')
  const response = await client.get('/preparation/dungeons').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toHaveLength(10)
}).teardown(async () => {
  await uninstall()
})
