import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { Application, install } from 'App/Core/application'

let app: Application

test('Get table score with 5 player', async ({ expect }) => {
  const names = Array(5)
    .fill(undefined)
    .map(() => faker.name.firstName())

  await Promise.all(names.map((name) => app.addPlayer.apply({ name })))

  const tableScore = await app.getTableScore.apply({
    limit: 5,
    page: 1,
  })

  expect(
    names.every((item) => tableScore.rows.map((player) => player.name.get()).includes(item))
  ).toBe(true)
}).setup(async () => {
  app = await install({ countOfDungeon: 20 })
  return () => app.flush()
})
