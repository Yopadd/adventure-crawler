import env from '#start/env'
import { test } from '@japa/runner'

test('visit Aazzidy adventure', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Player'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const response = await client.get(`/exploration/adventures/Aazzidy`).basicAuth(name, password)

  expect(response?.status()).toBe(200)
})
