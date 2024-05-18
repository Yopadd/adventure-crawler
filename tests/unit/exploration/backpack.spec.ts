import Backpack from '#app/core/exploration/player/backpack/backpack'
import BackpackFullError from '#app/core/exploration/player/backpack/backpack-full.error'
import Item from '#app/core/exploration/player/backpack/item/item'
import { test } from '@japa/runner'

test.group('Backpack', () => {
  test('size is limited', ({ expect }) => {
    expect(() => {
      new Backpack(
        Array(11)
          .fill(undefined)
          .map((_, index) => new Item(index.toString(), index.toString(), []))
      )
    }).toThrowError(BackpackFullError)

    expect(() => {
      new Backpack(
        Array(10)
          .fill(undefined)
          .map((_, index) => new Item(index.toString(), index.toString(), []))
      ).add(new Item('10', '10', []))
    }).toThrowError(BackpackFullError)
  })
})
