import { Items } from '#app/core/install/item/items'
import Backpack from '#app/core/preparation/backpack/backpack'
import BackpackFullError from '#app/core/preparation/backpack/backpack-full.error'
import { test } from '@japa/runner'

test.group('Backpack', () => {
  test('size is limited', ({ expect }) => {
    expect(() => {
      new Backpack(Object.values(Items))
    }).toThrowError(BackpackFullError)

    expect(() => {
      new Backpack().setItems(Object.values(Items))
    }).toThrowError(BackpackFullError)
  })
})
