import { test } from '@japa/runner'
import { app } from 'App/Core/application'
import { faker } from '@faker-js/faker'

test('add item', async ({ client, expect }) => {
  const name = faker.name.firstName()
  await client.post('/install')
  const playerResponse = await client.post('/players').json({ name })
  const player = playerResponse.body()

  const response = await client
    .post(`/players/${player.id}/inventory`)
    .basicAuth(name, 'pass')
    .json({})

  console.log(response.text())

  expect(response.status()).toBe(200)
}).teardown(() => {
  app.flush()
})
