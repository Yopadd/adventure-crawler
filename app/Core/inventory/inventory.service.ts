import NotFoundError from '../errors/not-found.error'
import Player from '../player/player'
import { AddItemsUseCaseInventoryService } from '../use-cases/add-items.use-case'
import Inventory from './inventory'
import Item from 'App/Core/item/item'

export interface InventoryServiceInventoryRepository {
  findById(id: string): Promise<Inventory | undefined>
  update(inventory: Inventory): Promise<Inventory | undefined>
}

export interface InventoryServiceItemRepository {
  save(item: Item): Promise<Item>
}

export default class InventoryService implements AddItemsUseCaseInventoryService {
  constructor(private readonly inventoryRepository: InventoryServiceInventoryRepository) {}

  public async add(player: Player, item: Item): Promise<Inventory | undefined> {
    const inventory = await this.inventoryRepository.findById(player.inventory.id)
    if (!inventory) {
      throw new NotFoundError(`Inventory of "${player.name}" (${player.id})`)
    }
    player.inventory.add(item)
    return this.inventoryRepository.update(player.inventory)
  }
}
