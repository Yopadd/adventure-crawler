import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('add item', async ({ client, expect }) => {
  const name = 'Jean'
  const password = '1234'
  await client.post('/install')
  const playerResponse = await client.post('/players').json({ name, password })
  const player = playerResponse.body()

  const response = await client
    .post(`/players/${player.id}/inventory`)
    .basicAuth(name, password)
    .json({})

  expect(response.status()).toBe(200)
}).teardown(() => {
  app.flush()
})
