import GetPageInput from '../pages/get-page-input'
import Item from './item'
import { InventoryServiceItemRepository } from '../inventory/inventory.service'
import ItemModel from 'App/Models/Item.model'

export default class ItemRepository implements InventoryServiceItemRepository {
  public async findAll(input: GetPageInput): Promise<Item[]> {
    const models = await ItemModel.query().forPage(input.page.get(), input.limit.get())
    return models.map((model) => model.toItem())
  }

  public async findByName(name: string): Promise<Item | undefined> {
    const model = await ItemModel.findBy('id', name)
    return model ? model.toItem() : undefined
  }

  public async save(item: Item): Promise<Item> {
    await ItemModel.create({
      id: item.name,
      description: item.description.get(),
    })
    return item
  }

  public flush() {
    return ItemModel.truncate(true)
  }
}
