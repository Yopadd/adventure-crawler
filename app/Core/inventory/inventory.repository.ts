import Inventory from './inventory'
import { InventoryServiceInventoryRepository } from './inventory.service'

export default class InventoryRepository implements InventoryServiceInventoryRepository {
  private readonly inventories = new Map<string, Inventory>()

  public async save(inventory: Inventory): Promise<Inventory> {
    this.inventories.set(inventory.id, inventory)
    return inventory
  }

  public async findById(id: string): Promise<Inventory | undefined> {
    return this.inventories.get(id)
  }

  public flush() {
    this.inventories.clear()
  }
}
