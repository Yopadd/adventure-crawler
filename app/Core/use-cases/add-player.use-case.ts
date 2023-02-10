import { UseCase } from '../application'
import Inventory from '../inventory/inventory'
import Player from '../player/player'

interface AddPlayerUseCaseInput {
  name: string
}

export interface AddPlayerUseCasePlayerService {
  create(name: string, inventory: Inventory): Promise<Player>
}

export interface AddPlayerUseCaseInventoryService {
  create(): Promise<Inventory>
}

export class AddPlayerUseCase implements UseCase<AddPlayerUseCaseInput, Promise<Player>> {
  constructor(
    private readonly playerService: AddPlayerUseCasePlayerService,
    private inventoryService: AddPlayerUseCaseInventoryService
  ) {}

  public async apply(input: AddPlayerUseCaseInput): Promise<Player> {
    const inventory = await this.inventoryService.create()
    return this.playerService.create(input.name, inventory)
  }
}
