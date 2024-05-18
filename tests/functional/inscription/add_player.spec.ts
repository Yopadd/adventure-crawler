import { game } from '#app/core/game'
import MaxPlayerErrors from '#app/core/inscription/errors/max-players-errors'
import env from '#start/env'
import { test } from '@japa/runner'
import Sinon from 'sinon'

test('add player', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Michael'
  const password = '1234'
  let response = await client.post('/inscription').json({ name, password })

  // Test idempotence
  response = await client.post('/inscription').json({ name, password })

  expect(response.status()).toBe(200)
  expect(response.body().message).toEqual(expect.stringContaining('/preparation'))
})

test('return forbidden error when max player is reached', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Michael'
  const password = '1234'
  let response = await client.post('/inscription').json({ name, password })

  expect(response.status()).toBe(403)
}).setup(() => {
  const stub = Sinon.stub(game, 'addPlayer').rejects(new MaxPlayerErrors())
  return () => {
    stub.restore()
  }
})
