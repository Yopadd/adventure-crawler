import { randomUUID } from "crypto";
import Item, { ItemName } from "../item/item";
import InventoryFullError from "./inventory-full.error";

export default class Inventory {
  private readonly size = 5;
  private readonly items = new Map<string, Item>();
  id = randomUUID();

  add(item: Item): Inventory {
    if (this.items.size === this.size) {
      throw new InventoryFullError();
    }
    this.items.set(item.name, item);
    return this;
  }

  has(name: ItemName): boolean {
    return this.items.has(name);
  }
}
