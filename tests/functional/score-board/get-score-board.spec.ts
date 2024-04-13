import ReportModel from '#models/report.model'
import env from '#start/env'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { randomUUID } from 'crypto'

test('get table score', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  await client.post('/inscription').json({ name: 'Scott', password: 'password' })
  await client.post('/inscription').json({ name: 'Michael', password: 'password' })

  await ReportModel.createMany([
    {
      id: randomUUID(),
      playerName: 'Michael',
      dungeonName: 'Volcania',
      score: 2,
    },
    {
      id: randomUUID(),
      playerName: 'Michael',
      dungeonName: 'Herotopia',
      score: 8,
    },
  ])

  const response = await client.get('/score-board').qs({
    limit: 10,
    page: 1,
  })

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual([
    {
      name: 'Michael',
      score: 10,
    },
    {
      name: 'Scott',
      score: 0,
    },
  ])
}).setup(() => testUtils.db().truncate())
