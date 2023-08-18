import { test } from '@japa/runner'
import { app } from 'App/Core/application'

test('get table score', async ({ client, expect }) => {
  const name = 'Scott'
  const password = '1234'
  await client.post('/install')
  await client.post('/players').json({ name, password })
  const response = await client.get('/scores').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toHaveLength(1)
  expect(response.body().at(0)).toStrictEqual({ name, score: 0 })
}).teardown(async () => {
  await app.uninstall()
})
