import Backpack from '#app/core/preparation/backpack/backpack'
import Item, { ItemName } from '#app/core/preparation/item/item'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'

interface AddItemUseCaseInput {
  itemsName: ItemName[]
  playerName: string
}

export interface ItemRepository {
  getByName(names: ItemName[], unitOfWork: unknown): Promise<Item[]>
}

export interface BackpackRepository {
  save(playerName: string, backpack: Backpack, unitOfWork: unknown): Promise<void>
  get(playerName: string, unitOfWork: unknown): Promise<Backpack>
}

export default class AddItemsUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly backpackRepository: BackpackRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  public async apply(input: AddItemUseCaseInput): Promise<void> {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const backpack = await this.backpackRepository.get(input.playerName, unitOfWork)
      const items = await this.itemRepository.getByName(input.itemsName, unitOfWork)
      backpack.setItems(items)
      await this.backpackRepository.save(input.playerName, backpack, unitOfWork)
    })
  }
}
