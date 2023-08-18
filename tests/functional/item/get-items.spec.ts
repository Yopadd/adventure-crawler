import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('get item list', async ({ client, expect }) => {
  await client.post('/install')

  const response = await client.get('/items').qs({
    limit: 100,
    page: 1,
  })

  expect(response.status()).toBe(200)
}).teardown(async () => {
  await app.uninstall()
})
