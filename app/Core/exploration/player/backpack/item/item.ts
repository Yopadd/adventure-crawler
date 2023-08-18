import ValidationError from '../../../../errors/validation.error'
import { StringValidation } from '../../../../validations/string-validation'
import { Tag } from 'App/Core/exploration/tag/tag'

export default class Item {
  public readonly name: ItemName
  public readonly description: ItemDescription
  public readonly tags: Set<Tag> = new Set()

  constructor(name: string, description: string, tags: string[]) {
    try {
      this.name = new ItemName(name)
      this.description = new ItemDescription(description)
      this.tags = new Set(tags)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate ${name} has failed`, err)
      }
      throw err
    }
  }

  public is(name: ItemName): boolean {
    return this.name.equal(name)
  }
}

export class ItemName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 300 })
  }

  public equal(other: ItemName): boolean {
    return this.value === other.value
  }
}

export class ItemDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}
