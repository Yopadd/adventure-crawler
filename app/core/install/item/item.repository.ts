import Item from '#app/core/install/item/item'
import { ItemRepository } from '#app/core/install/use-cases/initiate-items.use-case'
import ItemModel from '#models/item.model'

export default class ItemRepositoryDatabase implements ItemRepository {
  public async createMany(items: Item[]): Promise<void> {
    await ItemModel.createMany(
      items.map((item) => ({
        name: item.name.get(),
        description: item.description.get(),
        tags: Array.from(item.tags.values()).join(';'),
      }))
    )
  }
}
