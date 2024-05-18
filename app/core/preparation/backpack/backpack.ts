import BackpackFullError from '#app/core/preparation/backpack/backpack-full.error'
import Item from '#app/core/preparation/item/item'

export default class Backpack {
  public static readonly size = 10
  private _items: Item[]

  constructor(items: Item[] = []) {
    if (items.length > Backpack.size) {
      throw new BackpackFullError()
    }
    this._items = items
  }

  open(): readonly Item[] {
    return this._items
  }

  public setItems(items: Item[]) {
    if (items.length > Backpack.size) {
      throw new BackpackFullError()
    }
    this._items = items
  }

  public get items(): readonly Item[] {
    return this._items
  }
}
