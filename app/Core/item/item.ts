import ValidationError from '../errors/validation.error'
import { StringValidation } from '../validations/string-validation'

export default class Item {
  public readonly name: ItemName
  public readonly description: ItemDescription

  constructor(name: ItemName, description: string) {
    try {
      this.name = name
      this.description = new ItemDescription(description)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate ${name} has failed`, err)
      }
      throw err
    }
  }
}

export enum ItemName {
  COAT = 'Coat',
  POTION_FIRE_RESISTANCE = 'Potion fire resistance',
}

export class ItemDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}
