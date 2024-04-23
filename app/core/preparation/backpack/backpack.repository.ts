import { Backpack } from '#app/core/preparation/backpack/backpack'
import Item from '#app/core/preparation/item/item'
import { BackpackRepository as AddItems } from '#app/core/preparation/use-cases/add-items.use-case'
import { BackpackRepository as Get } from '#app/core/preparation/use-cases/get-backpack.use-case'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'

export class BackPackRepositoryDatabase implements Get, AddItems {
  public async get(playerName: string): Promise<Backpack> {
    const model = await BackpackModel.query()
      .preload('items')
      .where('playerName', playerName)
      .firstOrFail()
    return BackPackRepositoryDatabase.toBackpack(model)
  }

  async add(playerName: string, items: Item[]): Promise<void> {
    const model = await BackpackModel.findOrFail(playerName)
    await model.related('items').sync(items.map((item) => item.name.get()))
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(BackPackRepositoryDatabase.toItem))
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model)
  }
}
