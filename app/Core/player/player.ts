import { randomUUID } from 'crypto'
import ValidationError from '../errors/validation.error'
import Inventory from '../inventory/inventory'
import { ItemName } from '../item/item'
import { NumberValidation } from '../validations/number-validation'
import { StringValidation } from '../validations/string-validation'

export default class Player {
  public readonly name: PlayerName
  public score: PlayerScore
  public readonly inventory: Inventory

  constructor(name: string, score: number, inventory: Inventory) {
    try {
      this.name = new PlayerName(name)
      this.score = new PlayerScore(score)
      this.inventory = inventory
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate player "${name}" has failed`, err)
      }
      throw err
    }
  }

  public readonly id = randomUUID()

  public has(itemName: ItemName): boolean {
    return this.inventory.has(itemName)
  }
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 50 })
  }
}

export class PlayerScore extends NumberValidation {
  constructor(score: number) {
    super(score, { min: 0, max: Infinity })
  }
}
