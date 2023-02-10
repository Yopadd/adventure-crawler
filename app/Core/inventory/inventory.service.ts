import NotFoundError from '../errors/not-found.error'
import { default as Item, default as item } from '../item/item'
import Player from '../player/player'
import { AddItemsUseCaseInventoryService } from '../use-cases/add-items.use-case'
import { AddPlayerUseCaseInventoryService } from '../use-cases/add-player.use-case'
import Inventory from './inventory'

export interface InventoryServiceInventoryRepository {
  findById(id: string): Promise<Inventory | undefined>
  save(inventory: Inventory): Promise<Inventory>
}

export interface InventoryServiceItemRepository {
  save(item: Item): Promise<Item>
}

export default class InventoryService
  implements AddPlayerUseCaseInventoryService, AddItemsUseCaseInventoryService
{
  constructor(private readonly inventoryRepository: InventoryServiceInventoryRepository) {}

  public create(): Promise<Inventory> {
    return this.inventoryRepository.save(new Inventory())
  }

  public async add(player: Player, item: item): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(player.inventory.id)
    if (!inventory) {
      throw new NotFoundError(`Inventory of "${player.name}" (${player.id})`)
    }
    return this.inventoryRepository.save(inventory.add(item))
  }
}
