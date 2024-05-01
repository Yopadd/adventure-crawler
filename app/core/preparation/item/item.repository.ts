import Item, { ItemName, ItemPaginationInput } from '#app/core/preparation/item/item'
import { ItemRepository as GetByName } from '#app/core/preparation/use-cases/add-items.use-case'
import { ItemRepository as GetAllItems } from '#app/core/preparation/use-cases/get-items.use-case'
import ItemModel from '#models/item.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ItemRepositoryDatabase implements GetAllItems, GetByName {
  public async getAll(input: ItemPaginationInput): Promise<Item[]> {
    const pagination = await ItemModel.query()
      .where('hidden', false)
      .paginate(input.page.get(), input.limit.get())
    return pagination.all().map(ItemRepositoryDatabase.toItem)
  }

  async getByName(names: ItemName[], client: TransactionClientContract): Promise<Item[]> {
    const models = await ItemModel.findMany(
      names.map((name) => name.get()),
      { client }
    )
    return models.map(ItemRepositoryDatabase.toItem)
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model)
  }
}
