import { test } from '@japa/runner'
import { uninstall } from '#app/core/game'

test('add item', async ({ client, expect }) => {
  const name = 'Jean'
  const password = '1234'
  await client.post('/install')
  await client.post('/players').json({ name, password })

  let response = await client.get('/items').qs({
    limit: 1,
    page: 1,
  })
  expect(response.status()).toBe(200)
  console.log(response.body())
  const items = response.body().map((item) => item.name)

  response = await client.get(`/player`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().inventory.length).toBe(0)

  response = await client.post(`/player`).basicAuth(name, password).json(items)
  expect(response.status()).toBe(200)

  response = await client.get(`/player`).basicAuth(name, password)
  expect(response.status()).toBe(200)
  expect(response.body().inventory).toEqual(items)
}).teardown(async () => {
  await uninstall()
})
