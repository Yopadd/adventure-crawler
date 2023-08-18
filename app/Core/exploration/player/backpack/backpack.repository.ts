import Backpack from './backpack'
import { BackpackServiceInventoryRepository } from './backpack.service'
import InventoryModel from 'App/Models/Inventory.model'
import Player from 'App/Core/exploration/player/player'
import ItemModel from 'App/Models/Item.model'

export default class BackpackRepository implements BackpackServiceInventoryRepository {
  public async save(player: Player): Promise<Backpack> {
    await InventoryModel.create({
      id: player.backpack.id,
      playerModelId: player.id,
    })
    return player.backpack
  }

  public async findById(id: string): Promise<Backpack | undefined> {
    const model = await InventoryModel.findBy('id', id)
    if (model) {
      await model.load('items')
      return model.toInventory()
    }
  }

  public async update(inventory: Backpack): Promise<Backpack | undefined> {
    const model = await InventoryModel.findBy('id', inventory.id)

    function addMissing(model: InventoryModel, items: ItemModel[]) {
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
