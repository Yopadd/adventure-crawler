import Item, { ItemName, ItemPaginationInput } from '#app/core/preparation/item/item'
import { ItemRepository } from '#app/core/preparation/use-cases/get-items.use-case'
import ItemModel from '#models/item.model'

export default class ItemRepositoryDatabase implements ItemRepository {
  public async getAll(input: ItemPaginationInput): Promise<Item[]> {
    const pagination = await ItemModel.query().paginate(input.page.get(), input.limit.get())
    return pagination.all().map((model) => new Item(new ItemName(model.name)))
  }
}
