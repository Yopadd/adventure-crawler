import Item from '#app/core/install/item/item'

export interface ItemRepository {
  createMany(items: Item[]): Promise<void>
}

export default class InitiateItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async apply(): Promise<void> {
    await this.itemRepository.createMany([
      new Item({
        name: 'Potion de résistance au feu',
        description: 'Protège contre les brûlures',
        tags: ['potion', 'fire resistance'],
      }),
      new Item({
        name: "Gourde d'eau",
        description: 'Utile en cas de coup de chaux ou juste pour ce désaltérer',
        tags: ['water', 'potion', 'hydration'],
      }),
      new Item({
        name: 'Manteau',
        description: 'Garde au chaux',
        tags: ['armor', 'cold resistance'],
      }),
    ])
  }
}
