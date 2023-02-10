import { test } from '@japa/runner'
import { ItemName } from '../../app/Core/item/item'
import { Application, install } from '../../app/Core/application'

let app: Application

test('Get first 1000 item', async ({ expect }) => {
  const items = await app.getItems.apply({ limit: 1000, page: 1 })

  expect(items.some((item) => item.name === ItemName.COAT))
  expect(items.some((item) => item.name === ItemName.POTION_FIRE_RESISTANCE))
}).setup(async () => {
  app = await install({ countOfDungeon: 20 })
  return () => app.flush()
})
