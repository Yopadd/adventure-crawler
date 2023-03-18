import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { Application, install } from 'App/Core/application'

let app: Application

test('Get table score with 5 player', async ({ expect }) => {
  const playersData = Array(5)
    .fill(undefined)
    .map(() => ({
      name: faker.name.firstName(),
      password: faker.internet.password(),
    }))

  await Promise.all(playersData.map((data) => app.addPlayer.apply(data)))

  const tableScore = await app.getTableScore.apply({
    limit: 5,
    page: 1,
  })

  expect(
    playersData.every(({ name }) =>
      tableScore.rows.map((player) => player.name.get()).includes(name)
    )
  ).toBe(true)
}).setup(async () => {
  app = await install({ countOfDungeon: 20 })
  return () => app.flush()
})
