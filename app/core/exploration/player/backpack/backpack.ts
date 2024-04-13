import BackpackFullError from '#app/core/exploration/player/backpack/backpack-full.error'
import Item from '#app/core/exploration/player/backpack/item/item'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import { Tag } from '#app/core/install/tag/tag'

export default class Backpack implements EventResolver {
  private readonly size = 5
  private readonly _items: Item[]

  constructor(items: Item[] = []) {
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

  public countTag(tag: Tag): number {
    return this._items.filter((item) => item.tags.has(tag)).length
  }
}
