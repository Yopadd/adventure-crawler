import Item from '#app/core/install/item/item'

export const Items = {
  get Sword() {
    return new Item({
      name: 'Épée',
      description: 'Un simple bout de métal un peu tranchant',
      tags: ['weapon', 'sword', 'metal', 'iron'],
    })
  },

  get WaterBottle() {
    return new Item({
      name: "Gourde d'eau",
      description: 'Utile pour se désaltérer',
      tags: ['water', 'potion', 'hydration'],
    })
  },

  get FirePotion() {
    return new Item({
      name: 'Potion de résistance au feu',
      description: 'Protège contre les brûlures',
      tags: ['potion', 'fire resistance'],
    })
  },

  get FreezePotion() {
    return new Item({
      name: 'Potion de résistance au froid',
      description: 'Protège contre le froid',
      tags: ['potion', 'cold resistance'],
    })
  },

  get Coat() {
    return new Item({
      name: 'Manteau',
      description: 'Garde au chaud',
      tags: ['armor', 'cold resistance'],
    })
  },

  get LittleBagOfGoldenPieces() {
    return new Item({
      name: "Sac de pièce d'or",
      description: 'Un peu de monnaies',
      tags: ['money'],
    })
  },

  get Rubies() {
    return new Item({
      name: 'Rubis',
      description: 'Certains aiment les choses qui brillent',
      tags: ['money'],
    })
  },

  get Capsules() {
    return new Item({
      name: 'Capsules',
      description: "Elles proviennent probablement d'une collection",
      tags: ['money'],
    })
  },

  get Dagger() {
    return new Item({
      name: 'Dague',
      description: 'Un grand couteau',
      tags: ['weapon'],
    })
  },

  get WoodStick() {
    return new Item({
      name: 'Bâton',
      description:
        'Un simple bout de bois, ça peut être utile pour la marche et même peut-être pour se défendre',
      tags: ['weapon', 'wood'],
    })
  },

  get Torch() {
    return new Item({
      name: 'Torche',
      description:
        "Utile à la tombée de la nuit ou pour visiter une veille demeure plongée dans l'obscurité",
      tags: ['wood', 'light', 'fire'],
    })
  },

  get WoodShield() {
    return new Item({
      name: 'Bouclier en bois',
      description: 'Une simple planche de bois, mais souvent très utile',
      tags: ['armor', 'wood', 'shield'],
    })
  },

  get IronShield() {
    return new Item({
      name: 'Bouclier en fer',
      description: 'Une plaque de fer avec une poignée',
      tags: ['armor', 'iron', 'metal', 'shield'],
    })
  },

  get Rope() {
    return new Item({
      name: 'Corde',
      description: "C'est toujours utile",
      tags: ['climbing'],
    })
  },

  get GrapplingHook() {
    return new Item({
      name: 'Grappin',
      description: 'Si le chemin devient difficile',
      tags: ['climbing', 'metal'],
    })
  },

  get VialFilledWithFireFlies() {
    return new Item({
      name: 'Fiole remplie de luciole',
      description: "C'est une source de lumière presque infini si je m'en occupe bien",
      tags: ['light', 'potion', 'insect'],
    })
  },

  get Worms() {
    return new Item({
      name: 'Vers',
      description: 'Une poignée de vers dans un sac, utile pour la pêche',
      tags: ['insect'],
    })
  },

  get Bread() {
    return new Item({
      name: 'Baguette de pain',
      description: 'Une bonne baguette pour de bons sandwichs',
      tags: ['food'],
    })
  },

  get DriedMeat() {
    return new Item({
      name: 'Viandes séchées',
      description: 'Cela conserve bien',
      tags: ['food', 'meat'],
    })
  },

  get Mushrooms() {
    return new Item({
      name: 'Champignon',
      description: 'Pour une bonne salade',
      tags: ['food', 'vegetal'],
    })
  },

  get Cheese() {
    return new Item({
      name: 'Fromage',
      description: "L'indispensable du casse-croûte",
      tags: ['food'],
    })
  },

  get Milk() {
    return new Item({
      name: 'Lait',
      description: 'Une bouteille de lait',
      tags: ['food', 'hydration'],
    })
  },

  get HoodedCape() {
    return new Item({
      name: 'Cape à capuche',
      description: "Si je veux rester dans l'ombre",
      tags: ['stealth'],
    })
  },

  get Bow() {
    return new Item({
      name: 'Arc',
      description: 'Très pratique avec un peu d’entraînement',
      tags: ['weapon', 'ranged weapon'],
    })
  },

  get HealthPotion() {
    return new Item({
      name: 'Potion de soin',
      description: 'Simple et efficace',
      tags: ['care', 'magic'],
    })
  },

  get SurvivalKit() {
    return new Item({
      name: 'Kit de premier soins',
      description: "L'indispensable du kit de l'aventurier",
      tags: ['care'],
    })
  },

  get MagicProtectionScroll() {
    return new Item({
      name: 'Parchemin de protection magique',
      description: 'Efficace contre tout types de magie',
      tags: ['magic', 'magic resistance'],
    })
  },

  get RationalThought() {
    return new Item({
      name: 'Une pensée de rationalité',
      description: 'Je ne crois pas à la magie',
      tags: ['magic resistance'],
    })
  },

  get Smoke() {
    return new Item({
      name: 'Fumigène',
      description: 'Pour échapper a des situations compliquées',
      tags: ['stealth'],
    })
  },

  get Owl() {
    return new Item({
      name: 'Hibou',
      description: 'Les hiboux sont connus pour être en lien avec le monde astral',
      tags: ['animal', 'magic'],
    })
  },

  get Rat() {
    return new Item({
      name: 'Rat',
      description: "C'est juste un animal de compagnie",
      tags: ['animal'],
    })
  },

  get GolemArmor() {
    return new Item({
      name: 'Armure en pierre',
      description:
        "Une armure d'une ancienne civilisation, on raconte qu'il pouvait marcher dans les des forêts en feu avec",
      tags: ['armor', 'fire resistance', 'rock'],
    })
  },

  /**
   * HIDDEN ITEMS
   */
  get GoldNuggets() {
    return new Item({
      name: "Pépites d'or",
      description: '',
      tags: [
        'treasure',
        'gold',
        'gold',
        'gold',
        'gold',
        'gold',
        'money',
        'money',
        'money',
        'money',
        'money',
      ],
      hidden: true,
    })
  },

  get OldCrown() {
    return new Item({
      name: 'Couronne oublié',
      description: "La couronne d'un roi oublié",
      tags: ['treasure', 'gold', 'gold', 'gold', 'gold', 'money', 'money', 'money', 'money'],
      hidden: true,
    })
  },

  get OldStatuette() {
    return new Item({
      name: 'Petite statuette de chevalier en or',
      description: '',
      tags: ['treasure', 'gold', 'gold', 'money', 'money', 'money', 'money', 'money'],
      hidden: true,
    })
  },

  get GoldenEgg() {
    return new Item({
      name: 'Oeuf en or',
      description: "Provient de la poule au oeufs d'or",
      tags: ['treasure', 'gold', 'money', 'money', 'money'],
      hidden: true,
    })
  },

  get Eggs() {
    return new Item({
      name: 'Oeufs',
      description: 'Des oeufs frais',
      tags: ['food'],
      hidden: true,
    })
  },

  get SacrificeDagger() {
    return new Item({
      name: 'Dague à la lame rouge',
      description: 'Une dague à la lame rouge vif',
      tags: ['treasure', 'weapon', 'metal', 'iron', 'magic', 'sacrifice'],
      hidden: true,
    })
  },

  get Goat() {
    return new Item({
      name: 'Chèvre',
      description: 'Une chèvre trouvée pendant une aventure',
      tags: ['animal', 'goat'],
      hidden: true,
    })
  },
}
