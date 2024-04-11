import Item from '#app/core/install/item/item'

export interface ItemRepository {
  createMany(items: Item[]): Promise<void>
}

export default class InitiateItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async apply(): Promise<void> {
    await this.itemRepository.createMany([
      new Item({
        name: 'Fire resistance potion',
        description: 'Protect to fire',
        tags: ['potion', 'fire resistance'],
      }),
      new Item({
        name: 'Coat',
        description: 'Keep warm',
        tags: ['armor', 'cold resistance'],
      }),
    ])
  }
}
