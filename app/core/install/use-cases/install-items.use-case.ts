import Item from '#app/core/install/item/item'
import { Items } from '#app/core/install/item/items'

export interface ItemRepository {
  createMany(items: Item[]): Promise<void>
}

export default class InstallItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async apply(): Promise<void> {
    await this.itemRepository.createMany(Object.values(Items))
  }
}
