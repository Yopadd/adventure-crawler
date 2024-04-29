import Item from '#app/core/install/item/item'

export const Items = {
  Sword: new Item({
    name: 'Épée',
    description: 'Un simple bout de métal un peu tranchant',
    tags: ['weapon', 'sword', 'metal', 'iron'],
  }),

  WaterBottle: new Item({
    name: "Gourde d'eau",
    description: 'Utile en cas de coup de chaud ou juste pour se désaltérer',
    tags: ['water', 'potion', 'hydration'],
  }),

  FirePotion: new Item({
    name: 'Potion de résistance au feu',
    description: 'Protège contre les brûlures',
    tags: ['potion', 'fire resistance'],
  }),

  Coat: new Item({
    name: 'Manteau',
    description: 'Garde au chaud',
    tags: ['armor', 'cold resistance'],
  }),

  LittleBagOfGoldenPiece: new Item({
    name: "Sac de pièce d'or",
    description: 'Un peu de monnaies',
    tags: ['money'],
  }),

  Rubies: new Item({
    name: 'Des rubis',
    description: 'Certains aiment les choses qui brillent',
    tags: ['money'],
  }),

  Capsules: new Item({
    name: 'Des capsules',
    description: "Provienne probablement d'une collection",
    tags: ['money'],
  }),

  Dagger: new Item({
    name: 'Dague',
    description: "Un grand couteau, c'est bien pratique",
    tags: ['weapon'],
  }),

  WoodStick: new Item({
    name: 'Bâton',
    description:
      'Un simple bout bois, ça peut être utile pour le marche et même peut-être pour ce défendre',
    tags: ['weapon', 'wood'],
  }),

  Torch: new Item({
    name: 'Torche',
    description:
      "Utile à la tomber de la nuit ou pour visiter une veille demeure plongée dans l'obscurité",
    tags: ['wood', 'light', 'fire'],
  }),

  WoodShield: new Item({
    name: 'Bouclier en bois',
    description: 'Un simple planche de bois, mais souvent très utile',
    tags: ['armor', 'wood'],
  }),

  IronShield: new Item({
    name: 'Bouclier en fer',
    description: 'Un simple planche de bois, mais souvent très utile',
    tags: ['armor', 'iron', 'metal'],
  }),

  Rope: new Item({
    name: 'corde',
    description: "C'est toujours utile",
    tags: ['climbing'],
  }),

  GrapplingHook: new Item({
    name: 'Un grappin',
    description: 'Si le chemin devient difficile',
    tags: ['climbing', 'metal'],
  }),

  VialFilledWithFirefly: new Item({
    name: 'Fiole remplie de luciole',
    description: "C'est une source de lumière presque infini je m'en occupe bien",
    tags: ['light', 'potion', 'insect'],
  }),

  Bread: new Item({
    name: 'Baguette de pain',
    description: 'Un bonne baguette pour de bon sandwich',
    tags: ['food'],
  }),

  Mushrooms: new Item({
    name: 'Champignon',
    description: 'Parfait dans une bonne salade',
    tags: ['food'],
  }),

  Cheese: new Item({
    name: 'Fromage',
    description: "Facile à emporter, l'indispensable d'un bon casse-croûte",
    tags: ['food'],
  }),

  GoldNuggets: new Item({
    name: "Pépites d'or",
    description: '',
    tags: ['money', 'money', 'money', 'money', 'money'],
  }),
}
