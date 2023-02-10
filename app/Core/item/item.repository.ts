import GetPageInput from '../pages/get-page-input'
import Item from './item'
import { InventoryServiceItemRepository } from '../inventory/inventory.service'

export default class ItemRepository implements InventoryServiceItemRepository {
  private readonly items = new Map<string, Item>()

  public async findAll(input: GetPageInput): Promise<Item[]> {
    return input.getPage(this.items.values())
  }

  public async findByName(name: string): Promise<Item | undefined> {
    return this.items.get(name)
  }

  public async save(item: Item): Promise<Item> {
    this.items.set(item.name, item)
    return item
  }

  public flush() {
    this.items.clear()
  }
}
