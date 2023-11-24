import { test } from '@japa/runner'
import { uninstall } from 'App/Core/application'

test('add player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'Michael'
  const password = '1234'
  const response = await client.post('/players').json({ name, password })

  expect(response.status()).toBe(200)
}).teardown(async () => {
  await uninstall()
})
