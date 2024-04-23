import BackpackFullError from '#app/core/preparation/backpack/backpack-full.error'
import Item from '#app/core/preparation/item/item'

export class Backpack {
  private readonly size = 5

  constructor(private items: Item[] = []) {}

  open(): readonly Item[] {
    return this.items
  }

  public setItems(items: Item[]) {
    if (items.length > this.size) {
      throw new BackpackFullError()
    }
    this.items = items
  }

  public getItems(): readonly Item[] {
    return this.items
  }
}
