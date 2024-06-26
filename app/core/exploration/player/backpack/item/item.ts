import ValidationError from '#app/core/errors/validation.error'
import { Tag } from '#app/core/install/tag/tag'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Item {
  public readonly name: ItemName
  public readonly description: ItemDescription
  public readonly tags: Set<Tag> = new Set()

  constructor(name: string, description: string, tags: Tag[]) {
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

  public is(name: string): boolean {
    return this.name.equal(new ItemName(name))
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
