import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get 10 first adventures', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const response = await client.get('/preparation/adventures').qs({
    limit: 2,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body().length).toBe(2)
  response.body().forEach((adventure: unknown) => {
    expect(adventure).toEqual({
      name: expect.any(String),
    })
  })
}).setup(() => testUtils.db().truncate())
