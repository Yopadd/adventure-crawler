import Adventure from '#app/core/exploration/adventure/adventure'
import TreasureHunter from '#app/core/exploration/adventure/events/treasure-hunter'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Treasure hunter Event', (group) => {
  let event: TreasureHunter
  let adventureA: Adventure
  let adventureB: Adventure
  let adventureC: Adventure

  group.each.setup(() => {
    adventureA = new Adventure('a')
    adventureB = new Adventure('b')
    adventureC = new Adventure('c')

    event = new TreasureHunter([adventureA.name, adventureB.name, adventureC.name], 'F')
  })

  test('player has no visit', ({ expect }) => {
    const player = new Player('Le player', new Backpack())
    const note = new Note()
    event.resolve(player, note)

    expect(note.score.get()).toBe(0)
  })

  test('player has visit but not all adventures', ({ expect }) => {
    const player = new Player(
      'Le player',
      new Backpack(),
      new Map([['a', { adventure: adventureA, visitedAt: DateTime.fromISO('00:00:10') }]])
    )
    const note = new Note()
    event.resolve(player, note)

    expect(note.score.get()).toBe(0)
  })

  test('player has visit all adventures but order is wrong', ({ expect }) => {
    const player = new Player(
      'Le player',
      new Backpack(),
      new Map([
        ['a', { adventure: adventureA, visitedAt: DateTime.fromISO('00:00:10') }],
        ['b', { adventure: adventureB, visitedAt: DateTime.fromISO('00:00:15') }],
        ['c', { adventure: adventureC, visitedAt: DateTime.fromISO('00:00:05') }],
      ])
    )
    const note = new Note()
    event.resolve(player, note)

    expect(note.score.get()).toBe(0)
  })

  test('player has visit all adventures in good order', ({ expect }) => {
    const player = new Player(
      'Le player',
      new Backpack(),
      new Map([
        ['a', { adventure: adventureA, visitedAt: DateTime.fromISO('00:00:10') }],
        ['b', { adventure: adventureB, visitedAt: DateTime.fromISO('00:00:15') }],
        ['c', { adventure: adventureC, visitedAt: DateTime.fromISO('00:00:20') }],
      ])
    )
    const note = new Note()
    event.resolve(player, note)

    expect(note.score.get()).toBe(12)
  })
})
