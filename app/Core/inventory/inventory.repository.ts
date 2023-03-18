import Inventory from './inventory'
import { InventoryServiceInventoryRepository } from './inventory.service'
import InventoryModel from 'App/Models/Inventory.model'
import Player from 'App/Core/player/player'
import ItemModel from 'App/Models/Item.model'

export default class InventoryRepository implements InventoryServiceInventoryRepository {
  public async save(player: Player): Promise<Inventory> {
    await InventoryModel.create({
      id: player.inventory.id,
      playerModelId: player.id,
    })
    return player.inventory
  }

  public async findById(id: string): Promise<Inventory | undefined> {
    const model = await InventoryModel.findBy('id', id)
    if (model) {
      await model.load('items')
      return model.toInventory()
    }
  }

  public async update(inventory: Inventory): Promise<Inventory | undefined> {
    const model = await InventoryModel.findBy('id', inventory.id)
    if (model) {
      const names = inventory.getAll().map((item) => item.name)
      const items = await ItemModel.findMany(names)
      await model.related('items').detach()
      await model.related('items').saveMany(items)
      await model.load('items')
      return model.toInventory()
    }
  }
}
