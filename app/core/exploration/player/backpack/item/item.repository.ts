import { BackpackServiceItemRepository } from '#app/core/exploration/player/backpack/backpack.service'
import ItemModel from '#models/item.model'
import Item from './item.js'

export default class ItemRepository implements BackpackServiceItemRepository {
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
      name: item.name.get(),
      description: item.description.get(),
      tags: Array.from(item.tags.values()).join(';'),
    })
    return item
  }
}
