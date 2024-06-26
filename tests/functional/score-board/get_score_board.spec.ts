import ReportModel from '#models/report.model'
import env from '#start/env'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

test('get score board', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  await client.post('/inscription').json({ name: 'Scott', password: 'password' })
  await client.post('/inscription').json({ name: 'Michael', password: 'password' })

  await ReportModel.createMany([
    {
      id: randomUUID(),
      playerName: 'Michael',
      adventureName: 'Aazzidy',
      score: 2,
    },
    {
      id: randomUUID(),
      playerName: 'Scott',
      adventureName: 'Aazzidy',
      score: 8,
    },
  ])

  const response = await client.get('/score-board').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    rows: [
      {
        name: 'Scott',
        score: 8,
      },
      {
        name: 'Michael',
        score: 2,
      },
    ],
    updatedAt: expect.any(String),
  })
})
