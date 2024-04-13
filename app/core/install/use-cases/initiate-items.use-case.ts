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
        description: 'Utile en cas de coup de chaud ou juste pour se désaltérer',
        tags: ['water', 'potion', 'hydration'],
      }),
      new Item({
        name: 'Manteau',
        description: 'Garde au chaud',
        tags: ['armor', 'cold resistance'],
      }),
      new Item({
        name: "Sac de pièce d'or",
        description: 'Un peu de monnaies',
        tags: ['money'],
      }),
      new Item({
        name: 'Des rubis',
        description: 'Certains aiment les choses qui brillent',
        tags: ['money'],
      }),
      new Item({
        name: 'Des capsules',
        description: "Provienne probablement d'une collection",
        tags: ['money'],
      }),
      new Item({
        name: 'Dague',
        description: "Un grand couteau, c'est bien pratique",
        tags: ['weapon'],
      }),
    ])
  }
}
