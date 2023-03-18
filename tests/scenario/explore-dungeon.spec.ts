import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { ItemName } from '../../app/Core/item/item'
import { Application, install } from '../../app/Core/application'

test.group('Explore dungeon', (group) => {
  let app: Application

  group.setup(async () => {
    app = await install({ countOfDungeon: 20 })
    return () => app.flush()
  })

  test('Explore dungeon with no item in inventory player', async ({ expect }) => {
    const playerName = faker.name.firstName()
    const playerPassword = faker.internet.password()

    await app.addPlayer.apply({
      name: playerName,
      password: playerPassword,
    })

    const dungeons = await app.getDungeons.apply({
      limit: 1,
      page: 1,
    })

    const result = await app.exploreDungeon.apply({
      dungeonId: dungeons[0],
      playerName,
    })

    expect(result.score.get()).toBe(0)
  })

  test('Explore lava dungeon with fire potion item in inventory player', async ({ expect }) => {
    const playerName = faker.name.firstName()
    const playerPassword = faker.internet.password()

    await app.addPlayer.apply({
      name: playerName,
      password: playerPassword,
    })

    await app.addItems.apply({
      playerName,
      itemNames: [ItemName.COAT, ItemName.POTION_FIRE_RESISTANCE],
    })

    const dungeons = await app.getDungeons.apply({
      limit: 1,
      page: 1,
    })

    const result = await app.exploreDungeon.apply({
      dungeonId: dungeons[0],
      playerName,
    })

    expect(result.score.get()).toBe(100)
  })
})
