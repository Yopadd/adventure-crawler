import Backpack from '#app/core/exploration/player/backpack/backpack'
import BackpackFullError from '#app/core/exploration/player/backpack/backpack-full.error'
import { Items } from '#app/core/install/item/items'
import { test } from '@japa/runner'

test.group('Backpack', () => {
  test('size is limited', ({ expect }) => {
    expect(() => {
      new Backpack(Object.values(Items))
    }).toThrowError(BackpackFullError)

    expect(() => {
      new Backpack(Object.values(Items).slice(10)).add(Items.GoldNuggets)
    }).toThrowError(BackpackFullError)
  })
})
