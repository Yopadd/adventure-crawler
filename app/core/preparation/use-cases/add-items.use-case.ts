import { Backpack } from '#app/core/preparation/backpack/backpack'
import Item, { ItemName } from '#app/core/preparation/item/item'

interface AddItemUseCaseInput {
  itemsName: ItemName[]
  playerName: string
}

export interface ItemRepository {
  getByName(...names: ItemName[]): Promise<Item[]>
}

export interface BackpackRepository {
  save(playerName: string, backpack: Backpack): Promise<void>
  get(playerName: string): Promise<Backpack>
}

export default class AddItemsUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly backpackRepository: BackpackRepository
  ) {}

  public async apply(input: AddItemUseCaseInput): Promise<void> {
    const backpack = await this.backpackRepository.get(input.playerName)
    const items = await this.itemRepository.getByName(...input.itemsName)
    backpack.setItems(items)
    await this.backpackRepository.save(input.playerName, backpack)
  }
}
