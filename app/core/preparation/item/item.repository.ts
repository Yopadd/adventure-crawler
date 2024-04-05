import ItemModel from '#models/item.model'
import { ItemRepository } from '../use-cases/get-items.use-case'
import Item, { ItemName, ItemPaginationInput } from './item.js'

export default class ItemRepositoryDatabase implements ItemRepository {
  public async getAll(input: ItemPaginationInput): Promise<Item[]> {
    const models = await ItemModel.query().paginate(input.page.get(), input.limit.get())
    return models.map((model) => new Item(new ItemName(model.name)))
  }
}
