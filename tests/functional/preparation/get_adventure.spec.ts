import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test('get adventure list', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const response = await client.get('/preparation/adventures').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  const body = response.body()
  expect(body.adventures.length).toBe(1)
  body.adventures.forEach((adventure: unknown) => {
    expect(adventure).toEqual({
      name: expect.any(String),
    })
  })
  expect(body.total).toBe(1)
}).setup(() => testUtils.db().truncate())
