import { randomUUID } from 'crypto'
import Inventory from '../inventory/inventory'
import { StringValidation } from '../validations/string-validation'

export default class Dungeon {
  public readonly id = randomUUID()
  private readonly score: number

  constructor(public readonly properties: DungeonProperty[] = []) {
    this.score = properties.length * 100
  }

  public resolve(inventory: Inventory): number {
    if (!this.properties.length) {
      return this.score
    }

    const successPercentage =
      this.properties.reduce((acc, property) => acc + property.resolve(inventory), 0) /
      this.properties.length

    return this.score * successPercentage
  }
}

export interface DungeonProperty {
  description: DungeonPropertyDescription
  name: DungeonPropertyName
  resolve: (inventory: Inventory) => number
}

export class DungeonPropertyDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}

export enum DungeonPropertyName {
  LAVA = 'Lava',
}
