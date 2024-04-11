import ValidationError from '#app/core/errors/validation.error'
import { Tag } from '#app/core/install/tag/tag'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Item {
  public readonly name: ItemName
  public readonly description: ItemDescription
  public readonly tags: Set<Tag> = new Set()

  constructor(input: { name: string; description: string; tags: Tag[] }) {
    try {
      this.name = new ItemName(input.name)
      this.description = new ItemDescription(input.description)
      this.tags = new Set(input.tags)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate ${input.name} has failed`, err)
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
