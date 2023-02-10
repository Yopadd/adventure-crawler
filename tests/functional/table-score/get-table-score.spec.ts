import { test } from '@japa/runner'
import { app } from 'App/Core/application'
import { faker } from '@faker-js/faker'

test('get table score', async ({ client, expect }) => {
  const name = faker.name.firstName()
  await client.post('/install')
  await client.post('/players').json({ name })
  const response = await client.get('/scores').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toHaveLength(1)
  expect(response.body().at(0)).toStrictEqual({ name, score: 0 })
}).teardown(() => {
  app.flush()
})
