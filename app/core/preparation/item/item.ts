import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Item {
  public readonly name: ItemName
  public readonly description: ItemDescription

  constructor(input: { name: string; description: string }) {
    this.name = new ItemName(input.name)
    this.description = new ItemDescription(input.description)
  }
}

export class ItemName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface ItemPaginationInput {
  page: ItemPageNumber
  limit: ItemPageLimit
}

export class ItemPageLimit extends NumberValidation {
  constructor(limit: number) {
    super(limit, {
      max: 1000,
      min: 1,
    })
  }
}

export class ItemPageNumber extends NumberValidation {
  constructor(page: number) {
    super(page, {
      max: Number.POSITIVE_INFINITY,
      min: 1,
    })
  }
}

export class ItemDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}
