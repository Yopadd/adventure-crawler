import ItemChallenge from '#app/core/exploration/adventure/events/item-challenge'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Item from '#app/core/exploration/player/backpack/item/item'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { test } from '@japa/runner'

test('Item challenge', ({ expect }) => {
  const itemChallenge = new ItemChallenge(545)
  const player = new Player('Le Player', new Backpack([new Item('Un Item', '', ['armor'])]))
  const note = new Note()
  itemChallenge.resolve(player, note)
  expect(note.comment.get()).toEqual('545')
  expect(note.score.get()).toEqual(10)
})
