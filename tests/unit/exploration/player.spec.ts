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
      .toBe(`Jour 1; Un collectionneur, il doit pouvoir m'acheter quelques broutilles; Je n'ai rien pour lui malheureusement
Jour 2; Au voleur !; Je n'ai rien pu faire il m'a tout pris !
Jour 3; Des loups !; Fuir ! C'est la seul chose que je puise faire !
Jour 4; Un bon endroit pour faire une pause; Il est temps de reprendre la route
Jour 5; Devant moi une rivière de lave, impossible de continuer sans traverser
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
      .toBe(`Jour 1; Un collectionneur, il doit pouvoir m'acheter quelques broutilles; Il est intéressé par un de mes objets de valeurs
Jour 2; Au voleur !; J'ai de quoi me défendre !
Jour 3; Des loups !; Je suis suffisamment armé pour leurs tenir tête
Jour 4; Un bon endroit pour faire une pause; J'ai pu rallumer ce vieux feu de camp; C'est le bon moment pour un bon repas; Il est temps de reprendre la route
Jour 5; Devant moi une rivière de lave, impossible de continuer sans traverser; Heureusement, j'ai de quoi me protéger; Un peu d'eau fraîche avec cette chaleur, un plaisir
Jour 6; Un dragon qui dort juste devant moi. Derrière lui se trouve un trésor d'une valeur inestimable. Repartir vivant avec quelques pierres précieuses, c'est l'assurance d'une vie paisible; J'ai réussi à me faufiler sans un bruit et à récupérer quelque chose
`)
  })

  test('visit', async ({ expect }) => {
    const adventure = new Adventure('One')
    const player = new Player('Le player', new Backpack())

    player.visit(adventure).visit(adventure).visit(adventure)

    expect(player.adventuresVisited).toEqual([adventure, adventure, adventure])
  })

  test('visit limit', async ({ expect }) => {
    const adventures = Array(21)
      .fill(undefined)
      .map((_, index) => new Adventure(String(index)))
    const player = new Player('Le player', new Backpack())

    adventures.forEach((adventure) => player.visit(adventure))

    expect(player.adventuresVisited.length).toBe(20)
  })
})
