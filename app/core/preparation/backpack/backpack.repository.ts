import { Backpack } from '#app/core/preparation/backpack/backpack'
import Item from '#app/core/preparation/item/item'
import { BackpackRepository as AddItems } from '#app/core/preparation/use-cases/add-items.use-case'
import { BackpackRepository as Get } from '#app/core/preparation/use-cases/get-backpack.use-case'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export class BackPackRepositoryDatabase implements Get, AddItems {
  public async get(playerName: string, client?: TransactionClientContract): Promise<Backpack> {
    const model = await BackpackModel.query({ client })
      .preload('items')
      .where('playerName', playerName)
      .firstOrFail()
    return BackPackRepositoryDatabase.toBackpack(model)
  }

  async save(
    playerName: string,
    backpack: Backpack,
    client: TransactionClientContract
  ): Promise<void> {
    const model = await BackpackModel.findOrFail(playerName, { client })
    await model.related('items').sync(backpack.getItems().map((item) => item.name.get()))
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(BackPackRepositoryDatabase.toItem))
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model)
  }
}
