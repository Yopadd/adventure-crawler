import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('add item', async ({ client, expect }) => {
  const name = 'Jean'
  const password = '1234'
  await client.post('/install')
  const playerResponse = await client.post('/players').json({ name, password })
  const player = playerResponse.body()

  let response = await client.get('/items').qs({
    limit: 1,
    page: 1,
  })
  expect(response.status()).toBe(200)
  const items = response.body().map((item) => item.name)

  response = await client.get(`/players/${player.id}`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().inventory.length).toBe(0)

  response = await client
    .post(`/players/${player.id}/inventory`)
    .basicAuth(name, password)
    .json(items)
  expect(response.status()).toBe(200)

  response = await client.get(`/players/${player.id}/inventory`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body()).toEqual(items)
}).teardown(() => {
  app.flush()
})
