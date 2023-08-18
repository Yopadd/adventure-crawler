import { randomUUID } from 'crypto'
import Item from 'App/Core/exploration/player/backpack/item/item'
import BackpackFullError from './backpack-full.error'
import { Tag } from 'App/Core/exploration/tag/tag'

export default class Backpack {
  private readonly size = 5
  private readonly _items: Item[]

  constructor(public readonly id: string = randomUUID(), items: Item[] = []) {
    this._items = items
  }

  public get items(): readonly Item[] {
    return this._items
  }

  public add(item: Item) {
    if (this._items.length === this.size) {
      throw new BackpackFullError()
    }
    this._items.push(item)
  }

  public hasTag(tag: Tag): boolean {
    return this._items.some((item) => item.tags.has(tag))
  }
}
