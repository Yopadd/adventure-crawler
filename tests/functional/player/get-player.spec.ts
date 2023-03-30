import { test } from '@japa/runner'

test('get player', async ({ client, expect }) => {
  const name = 'Jean'
  const password = 'blagueun'
  await client.post('/install')

  const playerResponse = await client.post('/players').json({ name, password })
  const player = playerResponse.body()

  const response = await client.get(`/players/${player.id}`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().id).toBe(player.id)
})
