import PlayerModel from '#models/player.model'
import env from '#start/env'
import { test } from '@japa/runner'
import MonkeyTester from './monkey_tester.js'

test('Monkey tests', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const monkey = new MonkeyTester(client)

  const report = await monkey.play(1000)

  console.table({
    requests: report.requests.reduce<Record<string, number>>((acc, request) => {
      if (request in acc) {
        acc[request]++
      } else {
        acc[request] = 0
      }
      return acc
    }, {}),
    requestCount: report.requests.length,
  })

  const players = await PlayerModel.query()
    .preload('reports')
    .preload('adventuresVisited')
    .preload('backpack', (backpack) => {
      backpack.preload('items')
    })
  console.table(
    players.map((p) => ({
      name: p.name,
      backpack: p.backpack.items.map((i) => i.name).join(';'),
    }))
  )

  console.table(
    players
      .flatMap((p) => p.reports)
      .map((r) => ({
        name: r.playerName,
        adventure: r.adventureName.substring(0, 8),
        comment: r.comment.substring(0, 30),
        score: r.score,
      }))
  )
  const response = await client.get('/score-board').qs({
    limit: 20,
    page: 1,
  })
  const scoreBoard = response.body().rows
  console.table(scoreBoard)

  expect(monkey.error).toBe(null)
})
