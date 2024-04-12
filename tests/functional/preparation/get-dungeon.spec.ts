import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get 10 first dungeons', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const response = await client.get('/preparation/dungeons').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body().length).toBe(10)
  response.body().forEach((dungeon: unknown) => {
    expect(dungeon).toEqual({
      name: expect.any(String),
    })
  })
}).setup(() => testUtils.db().truncate())
