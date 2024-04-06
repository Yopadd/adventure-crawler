import Item from '#app/core/preparation/item/item'

export class Backpack {
  constructor(private readonly items: Item[] = []) {}

  open(): readonly Item[] {
    return this.items
  }
}
