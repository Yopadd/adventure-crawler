import { uninstall } from '#app/core/game'
import { test } from '@japa/runner'

test('get item list', async ({ client, expect }) => {
  await client.post('/install')

  const response = await client.get('/preparation/items').qs({
    limit: 100,
    page: 1,
  })

  expect(response.status()).toBe(200)
}).teardown(async () => {
  await uninstall()
})
