import BackpackFullError from '#app/core/exploration/player/backpack/backpack-full.error'
import Item from '#app/core/exploration/player/backpack/item/item'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import { Tag } from '#app/core/install/tag/tag'

export default class Backpack implements EventResolver {
  private readonly size = 10
  private _items: Item[]

  constructor(items: Item[] = []) {
    if (items.length > this.size) {
      throw new BackpackFullError()
    }
    this._items = items
  }

  public get items(): readonly Item[] {
    return this._items
  }

  public add(item: Item, fallback: () => void): this {
    if (this._items.length === this.size) {
      fallback()
      return this
    }
    this._items.push(item)
    return this
  }

  public hasTag(tag: Tag): boolean {
    return this._items.some((item) => item.tags.has(tag))
  }

  public countTag(tag: Tag): number {
    return this._items.filter((item) => item.tags.has(tag)).length
  }

  public getAllTags(): Tag[] {
    return this._items.flatMap((item) => [...item.tags])
  }

  public empty(): void {
    this._items = []
  }

  public removeAllFromTag(tag: Tag) {
    this._items = this._items.filter((item) => !item.tags.has(tag))
  }

  public static handleBackFullError(err: Error, fallback: () => void) {
    if (err instanceof BackpackFullError) {
      fallback()
    } else {
      throw err
    }
  }
}
