import Adventure from '#app/core/exploration/adventure/adventure'
import Collector from '#app/core/exploration/adventure/events/collector'
import CrossingLavaRiver from '#app/core/exploration/adventure/events/crossing-lava-river'
import Dragon from '#app/core/exploration/adventure/events/dragon'
import FireCamp from '#app/core/exploration/adventure/events/fire-camp'
import Thief from '#app/core/exploration/adventure/events/thief'
import Wolfs from '#app/core/exploration/adventure/events/wolfs'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Player from '#app/core/exploration/player/player'
import { Items } from '#app/core/install/item/items'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Player', () => {
  test('explore without items', async ({ expect }) => {
    const adventure = new Adventure('Aazzidy', [
      new Collector(),
      new Thief(),
      new Wolfs(2),
      new FireCamp(),
      new CrossingLavaRiver(),
      new Dragon(),
    ])
    const backpack = new Backpack()
    const player = new Player('Le player', backpack)

    const report = player.explore(adventure)

    expect(report.score).toEqual(1)
    expect(report.comment)
      .toBe(`Jour 1; Un collectionneur, il devrait pouvoir m'acheter quelques broutilles; Je n'avais rien pour lui malheureusement
Jour 2; Je me baladais dans un marché, au milieu de la foule, quand j'ai entendu un cri dans ma direction 'Au voleur !'; Je n'ai rien pu faire, il m'a tout pris !
Jour 3; Des loups !; J'ai dû fuir ! C'était la seule chose que je pouvais faire !
Jour 4; Un bon endroit pour faire une pause; Il était temps de reprendre la route
Jour 5; Devant moi se trouvait une rivière de lave, impossible de continuer sans traverser
`)
  })
  test('explore with several items', async ({ expect }) => {
    const adventure = new Adventure('Aazzidy', [
      new Collector(),
      new Thief(),
      new Wolfs(2),
      new FireCamp(),
      new CrossingLavaRiver(),
      new Dragon(),
    ])
    const backpack = new Backpack()
    const player = new Player('Le player', backpack)

    player.backpack
      .add(Items.Sword, () => {})
      .add(Items.Dagger, () => {})
      .add(Items.Rubies, () => {})
      .add(Items.DriedMeat, () => {})
      .add(Items.WaterBottle, () => {})
      .add(Items.Torch, () => {})
      .add(Items.FirePotion, () => {})
      .add(Items.HoodedCape, () => {})

    const report = player.explore(adventure)

    expect(report.score).toEqual(14)
    expect(player.backpack.items.map((item) => item.name.get())).toContain("Pépites d'or")
    expect(report.comment)
      .toBe(`Jour 1; Un collectionneur, il devrait pouvoir m'acheter quelques broutilles; Il était intéressé par un de mes objets de valeur
Jour 2; Je me baladais dans un marché, au milieu de la foule, quand j'ai entendu un cri dans ma direction 'Au voleur !'; Heureusement, j'avais de quoi me défendre ! Il est reparti bredouille
Jour 3; Des loups !; J'étais suffisamment armé pour leur tenir tête
Jour 4; Un bon endroit pour faire une pause; J'avais pu rallumer ce vieux feu de camp; C'était le bon moment pour un bon repas; Il était temps de reprendre la route
Jour 5; Devant moi se trouvait une rivière de lave, impossible de continuer sans traverser; Heureusement, j'avais de quoi me protéger; Un peu d'eau fraîche avec cette chaleur, un plaisir
Jour 6; Un dragon dormait juste devant moi. Derrière lui se trouvait un trésor d'une valeur inestimable. Repartir vivant avec quelques pierres précieuses, c'était l'assurance d'une vie paisible; J'ai réussi à me faufiler sans un bruit et à récupérer quelque chose
`)
  })

  test('visit', async ({ expect }) => {
    const adventureA = new Adventure('a')
    const adventureB = new Adventure('b')
    const adventureC = new Adventure('c')
    const player = new Player('Le player', new Backpack())

    player.visit(adventureA).visit(adventureB).visit(adventureC)

    expect(player.adventuresVisited).toEqual([
      { adventure: adventureA, visitedAt: expect.any(DateTime) },
      { adventure: adventureB, visitedAt: expect.any(DateTime) },
      { adventure: adventureC, visitedAt: expect.any(DateTime) },
    ])
  })

  test('visit limit', async ({ expect }) => {
    const adventures = Array(21)
      .fill(undefined)
      .map((_, index) => new Adventure(String(index)))
    const player = new Player('Le player', new Backpack())

    adventures.forEach((adventure) => player.visit(adventure))

    expect(player.adventuresVisited.length).toBe(20)
  })

  test('get visit list', async ({ expect }) => {
    const adventureA = new Adventure('a')
    const adventureB = new Adventure('b')
    const adventureC = new Adventure('c')

    const player = new Player(
      'Le player',
      new Backpack(),
      new Map([
        ['a', { adventure: adventureA, visitedAt: DateTime.fromISO('00:00:15') }],
        ['b', { adventure: adventureB, visitedAt: DateTime.fromISO('00:00:20') }],
        ['c', { adventure: adventureC, visitedAt: DateTime.fromISO('00:00:10') }],
      ])
    )

    expect(player.adventuresVisited).toEqual([
      { adventure: adventureB, visitedAt: DateTime.fromISO('00:00:20') },
      { adventure: adventureA, visitedAt: DateTime.fromISO('00:00:15') },
      { adventure: adventureC, visitedAt: DateTime.fromISO('00:00:10') },
    ])
  })
})
