import NotFoundError from '../../../errors/not-found.error'
import Player from '../player'
import { AddItemsUseCaseInventoryService } from '../../../preparation/use-cases/add-items.use-case'
import Backpack from './backpack'
import Item from 'App/Core/exploration/player/backpack/item/item'

export interface BackpackServiceInventoryRepository {
  findById(id: string): Promise<Backpack | undefined>
  update(inventory: Backpack): Promise<Backpack | undefined>
}

export interface BackpackServiceItemRepository {
  save(item: Item): Promise<Item>
}

export default class BackpackService implements AddItemsUseCaseInventoryService {
  constructor(private readonly inventoryRepository: BackpackServiceInventoryRepository) {}

  public async add(player: Player, item: Item): Promise<Backpack | undefined> {
    const inventory = await this.inventoryRepository.findById(player.backpack.id)
    if (!inventory) {
      throw new NotFoundError(`Inventory of "${player.name}" (${player.id})`)
    }
    player.backpack.add(item)
    return this.inventoryRepository.update(player.backpack)
  }
}
