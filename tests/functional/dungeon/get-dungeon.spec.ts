import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('get 10 first dungeons', async ({ client, expect }) => {
  await client.post('/install')
  const response = await client.get('/dungeons').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toHaveLength(10)
}).teardown(async () => {
  await app.uninstall()
})
