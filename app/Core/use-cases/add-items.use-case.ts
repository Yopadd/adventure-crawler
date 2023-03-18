import { UseCase } from '../application'
import Inventory from '../inventory/inventory'
import Item, { ItemName } from '../item/item'
import Player from '../player/player'

interface AddItemUseCaseInput {
  itemNames: ItemName[]
  playerName: string
}

export interface AddItemsUseCasePlayerService {
  getByName(name: string): Promise<Player>
}

export interface AddItemsUseCaseItemService {
  getByName(name: ItemName): Promise<Item>
}

export interface AddItemsUseCaseInventoryService {
  add(player: Player, item: Item): Promise<Inventory | undefined>
}

export class AddItemsUseCase implements UseCase<AddItemUseCaseInput, Promise<Player>> {
  constructor(
    private readonly playerService: AddItemsUseCasePlayerService,
    private readonly itemService: AddItemsUseCaseItemService,
    private readonly inventoryService: AddItemsUseCaseInventoryService
  ) {}

  public async apply(input: AddItemUseCaseInput): Promise<Player> {
    const player = await this.playerService.getByName(input.playerName)
    for await (const item of input.itemNames.map((item) => this.itemService.getByName(item))) {
      await this.inventoryService.add(player, item)
    }
    return player
  }
}
