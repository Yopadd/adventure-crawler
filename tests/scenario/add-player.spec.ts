import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { Application, install } from 'App/Core/application'

test.group('Add player', (group) => {
  let app: Application

  group.setup(async () => {
    app = await install({ countOfDungeon: 20 })
    return () => app.flush()
  })

  test('Add 1 player', async ({ expect }) => {
    const name = faker.name.firstName()

    const player = await app.addPlayer.apply({ name })

    expect(player.name.get()).toBe(name)
    expect(player.score.get()).toBe(0)
  })

  test('When player already exist then throw an error', async ({ expect }) => {
    const name = faker.name.firstName()

    const player = await app.addPlayer.apply({ name })

    expect(app.addPlayer.apply({ name })).rejects.toMatchObject({
      message: `player "${player.name.get()}" already exist`,
    })
  })
})
