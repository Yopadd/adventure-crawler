import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('add player', async ({ client, expect }) => {
  await client.post('/install')
  const name = 'Michael'
  const password = '1234'
  const response = await client.post('/players').json({ name, password })

  expect(response.status()).toBe(200)
  expect(response.body()).toStrictEqual({
    id: expect.any(String),
    name,
    score: 0,
  })
}).teardown(() => {
  app.flush()
})
