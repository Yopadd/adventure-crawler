import Item, { ItemName } from '#app/core/preparation/item/item'

interface AddItemUseCaseInput {
  itemsName: ItemName[]
  playerName: string
}

export interface ItemRepository {
  getByName(name: ItemName): Promise<Item>
}

export interface BackpackRepository {
  add(playerName: string, item: Item): Promise<void>
}

export default class AddItemsUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly backpackRepository: BackpackRepository
  ) {}

  public async apply(input: AddItemUseCaseInput): Promise<void> {
    for await (const item of input.itemsName.map((item) => this.itemRepository.getByName(item))) {
      await this.backpackRepository.add(input.playerName, item)
    }
  }
}
