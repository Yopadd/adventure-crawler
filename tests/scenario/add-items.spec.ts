import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { ItemName } from 'App/Core/item/item'
import { Application, install } from 'App/Core/application'

test.group('Add item', (group) => {
  let app: Application

  group.setup(async () => {
    app = await install({ countOfDungeon: 20 })
    return () => app.flush()
  })

  test('Add 1 item to inventory', async ({ expect }) => {
    const name = faker.name.firstName()
    const password = faker.internet.password()
    let player = await app.addPlayer.apply({ name, password })
    player = await app.addItems.apply({
      itemNames: [ItemName.COAT],
      playerName: player.name.get(),
    })

    expect(player.has(ItemName.COAT)).toBe(true)
  })

  test('Add 2 items to inventory', async ({ expect }) => {
    const name = faker.name.firstName()
    const password = faker.internet.password()
    let player = await app.addPlayer.apply({ name, password })
    player = await app.addItems.apply({
      itemNames: [ItemName.COAT, ItemName.POTION_FIRE_RESISTANCE],
      playerName: player.name.get(),
    })

    expect(player.has(ItemName.COAT)).toBe(true)
    expect(player.has(ItemName.POTION_FIRE_RESISTANCE)).toBe(true)
  })
})
