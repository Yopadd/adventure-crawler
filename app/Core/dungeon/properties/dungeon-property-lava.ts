import ValidationError from '../../errors/validation.error'
import Inventory from '../../inventory/inventory'
import { ItemName } from '../../item/item'
import { DungeonProperty, DungeonPropertyDescription, DungeonPropertyName } from '../dungeon'

export default class DungeonPropertyLava implements DungeonProperty {
  public readonly description: DungeonPropertyDescription
  public readonly name = DungeonPropertyName.LAVA
  public readonly itemsRequired: ItemName[] = [ItemName.POTION_FIRE_RESISTANCE]

  constructor() {
    try {
      this.description = new DungeonPropertyDescription('The temperature is unbearable')
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate "${this.name}" description has failed`, err)
      }
      throw err
    }
  }

  public resolve(inventory: Inventory): number {
    if (inventory.has(ItemName.POTION_FIRE_RESISTANCE)) {
      return 1
    }
    return 0
  }
}
