import Player from 'App/Core/exploration/player/player'
import BackpackModel from 'App/Models/Inventory.model'
import ItemModel from 'App/Models/Item.model'
import Backpack from './backpack'
import { BackpackServiceInventoryRepository } from './backpack.service'

export default class BackpackRepository implements BackpackServiceInventoryRepository {
  public async save(player: Player): Promise<Backpack> {
    await BackpackModel.create({
      id: player.backpack.id,
      playerModelId: player.id,
    })
    return player.backpack
  }

  public async findById(id: string): Promise<Backpack | undefined> {
    const model = await BackpackModel.findBy('id', id)
    if (model) {
      await model.load('items')
      return model.toInventory()
    }
  }

  public async update(inventory: Backpack): Promise<Backpack | undefined> {
    const model = await BackpackModel.findBy('id', inventory.id)

    function addMissing(model: BackpackModel, items: ItemModel[]) {
      for (const item of items) {
        if (model.items.every(({ id }) => id !== item.id)) {
          model.items.push(item)
        }
      }
    }

    if (model) {
      const names = inventory.items.map((item) => item.name)
      const items = await ItemModel.findMany(names)
      addMissing(model, items)
      await model.save()
      await model.load('items')
      return model.toInventory()
    }
  }
}
