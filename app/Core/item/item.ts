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

export function mapToItemName(name: string): ItemName | undefined {
  switch (name) {
    case ItemName.COAT:
      return ItemName.COAT
    case ItemName.POTION_FIRE_RESISTANCE:
      return ItemName.POTION_FIRE_RESISTANCE
  }
}

export class ItemDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}
