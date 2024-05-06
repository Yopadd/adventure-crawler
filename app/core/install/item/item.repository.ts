import Item from '#app/core/install/item/item'
import { ItemRepository } from '#app/core/install/use-cases/install.use-case'
import ItemModel from '#models/item.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ItemRepositoryDatabase implements ItemRepository {
  public async createMany(items: Item[], transaction: TransactionClientContract): Promise<void> {
    await ItemModel.createMany(
      items.map((item) => ({
        name: item.name.get(),
        description: item.description.get(),
        tags: Array.from(item.tags.values()).join(';'),
        hidden: item.hidden,
      })),
      { client: transaction }
    )
  }
}
