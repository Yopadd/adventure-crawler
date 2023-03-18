import { randomUUID } from 'crypto'
import Item, { ItemName } from '../item/item'
import InventoryFullError from './inventory-full.error'

export default class Inventory {
  private readonly size = 5
  private readonly items = new Map<string, Item>()

  constructor(public readonly id: string = randomUUID(), items: Item[] = []) {
    items.forEach((item) => this.add(item))
  }

  public getAll(): Item[] {
    return Array.from(this.items.values())
  }

  public add(item: Item): Inventory {
    if (this.items.size === this.size) {
      throw new InventoryFullError()
    }
    this.items.set(item.name, item)
    return this
  }

  public has(name: ItemName): boolean {
    return this.items.has(name)
  }
}
