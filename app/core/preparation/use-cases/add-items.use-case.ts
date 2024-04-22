import Item, { ItemName } from '#app/core/preparation/item/item'

interface AddItemUseCaseInput {
  itemsName: ItemName[]
  playerName: string
}

export interface ItemRepository {
  getByName(...names: ItemName[]): Promise<Item[]>
}

export interface BackpackRepository {
  add(playerName: string, items: Item[]): Promise<void>
}

export default class AddItemsUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly backpackRepository: BackpackRepository
  ) {}

  public async apply(input: AddItemUseCaseInput): Promise<void> {
    const items = await this.itemRepository.getByName(...input.itemsName)
    await this.backpackRepository.add(input.playerName, items)
  }
}
