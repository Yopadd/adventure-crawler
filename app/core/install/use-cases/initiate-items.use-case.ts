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
      new Item({
        name: 'Bâton',
        description:
          'Un simple bout bois, ça peut être utile pour le marche et même peut-être pour ce défendre',
        tags: ['weapon', 'wood'],
      }),
      new Item({
        name: 'Torche',
        description:
          "Utile à la tomber de la nuit ou pour visiter une veille demeure plongée dans l'obscurité",
        tags: ['wood', 'light', 'fire'],
      }),
      new Item({
        name: 'Épée',
        description: 'Un simple bout de métal un peu tranchant',
        tags: ['weapon', 'sword', 'metal', 'iron'],
      }),
      new Item({
        name: 'Bouclier en bois',
        description: 'Un simple planche de bois, mais souvent très utile',
        tags: ['armor', 'wood'],
      }),
      new Item({
        name: 'Bouclier en fer',
        description: 'Un simple planche de bois, mais souvent très utile',
        tags: ['armor', 'iron', 'metal'],
      }),
      new Item({
        name: 'corde',
        description: "C'est toujours utile",
        tags: ['climbing'],
      }),
      new Item({
        name: 'Un grappin',
        description: 'Si le chemin devient difficile',
        tags: ['climbing', 'metal'],
      }),
      new Item({
        name: 'Fiole remplie de luciole',
        description: "C'est une source de lumière presque infini je m'en occupe bien",
        tags: ['light', 'potion', 'insect'],
      }),
      new Item({
        name: 'Baguette de pain',
        description: 'Un bonne baguette pour de bon sandwich',
        tags: ['food'],
      }),
      new Item({
        name: 'Champignon',
        description: 'Parfait dans une bonne salade',
        tags: ['food'],
      }),
      new Item({
        name: 'Fromage',
        description: "Facile à emporter, l'indispensable d'un bon casse-croûte",
        tags: ['food'],
      }),
    ])
  }
}
